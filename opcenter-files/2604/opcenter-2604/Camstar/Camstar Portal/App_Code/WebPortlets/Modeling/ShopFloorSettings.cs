// Copyright Siemens 2026  
using Camstar.WCF.ObjectStack;
using Camstar.WCF.Services;
using Camstar.WebPortal.Constants;
using Camstar.WebPortal.FormsFramework.Utilities;
using Camstar.WebPortal.FormsFramework.WebGridControls;
using Camstar.WebPortal.Personalization;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using WebClientPortal;
using static Org.BouncyCastle.Math.EC.ECCurve;
using CWC = Camstar.WebPortal.FormsFramework.WebControls;
using OM = Camstar.WCF.ObjectStack;


namespace Camstar.WebPortal.WebPortlets.Modeling
{
    public class ShopFloorSettings : MatrixWebPart
    {
        protected virtual CWC.NamedObject AIInferenceServerConfig { get { return Page.FindCamstarControl("ObjectChanges_AIInferenceServerConfig") as CWC.NamedObject; } }
        protected virtual CWC.NamedObject AITrainingServerConfig { get { return Page.FindCamstarControl("ObjectChanges_AITrainingServerConfig") as CWC.NamedObject; } }
        protected virtual CWC.Button StartTrainingButton { get { return Page.FindCamstarControl("ButtonStartTraining") as CWC.Button; } }
        protected virtual CWC.TextBox TextBoxTrainingStatus { get { return Page.FindCamstarControl("TextBoxTrainingStatus") as CWC.TextBox; } }
        protected Camstar.WebPortal.PortalFramework.ToggleContainer AIServerConfigurationTC { get { return Page.FindCamstarControl("AIServerConfiguration") as Camstar.WebPortal.PortalFramework.ToggleContainer; } }

        private bool JustStartedTraining = false;
        private bool HasAIServerLicenseChecked = false;
        private bool HasAIServerLicense = false;

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            StartTrainingButton.UseSubmitBehavior = false;
            StartTrainingButton.Click += StartTrainingButton_Click;
            TextBoxTrainingStatus.ReadOnly = true;
            // Hide by default - only show if user has the required license
            AIServerConfigurationTC.Visible = CheckAIServerLicense();

        }

        protected override void OnPreRender(EventArgs e)
        {
            base.OnPreRender(e);

                if (CheckAIServerLicense() && Page.IsPostBack && !JustStartedTraining)
                {
                    GetAITrainingServerStatus();
                }   
        }

        /// <summary>
        /// Checks if the customer is licensed for AI Server (for now is AI Repair Advisor).
        /// In the future, this can be extended to check for other AI-related service licenses.
        /// </summary>
        /// <returns>True if licensed, false otherwise.</returns>
        protected virtual bool CheckAIServerLicense()
        {
            // Return cached result if already checked
            if (HasAIServerLicenseChecked)
                return HasAIServerLicense;

            var hasAIRepairAdvisor = false;
            var session = FrameworkManagerUtil.GetFrameworkSession(HttpContext.Current.Session);
            if (session != null)
            {
                try
                {
                    var service = new AIRepairAdvisorInquiryService(session.CurrentUserProfile);
                    var serviceData = new AIRepairAdvisorInquiry();

                    AIRepairAdvisorInquiry_Result result;
                    var resultStatus = service.ExecuteTransaction(serviceData, null, out result);

                    if (resultStatus != null && resultStatus.IsSuccess)
                    {
                        hasAIRepairAdvisor = true;
                    }
                }
                catch (Exception)
                {
                    // Intentionally not displaying any error message
                    // User may not have the license or role for this service
                }
            }

            // Cache the result
            HasAIServerLicense = hasAIRepairAdvisor;
            HasAIServerLicenseChecked = true;

            return HasAIServerLicense;
        }

        private void StartTrainingButton_Click(object sender, EventArgs e)
        {
            WebClientPortal.AIServerService aiService = new WebClientPortal.AIServerService();

            // Use the configured training server to start training.
            // If not set, the method will check the session value.
            // Note: getting the configured value into the session requires logging in again after saving in the modeling page.
            string trainConfigName = AITrainingServerConfig.Data != null ? (AITrainingServerConfig.Data as NamedObjectRef).Name : "";

            string trainingStatus = string.Empty;
            OM.ResultStatus result = aiService.StartTraining(trainConfigName, out trainingStatus);
            if (result.IsSuccess)
            {
                // When the Start Training button is clicked, a postback occurs. 
                // This flag ensures we display "Started" in TextBoxTrainingStatus and skip GetAITrainingServerStatus, 
                // preventing redundant status checks immediately after submission.
                JustStartedTraining = true; 

                TextBoxTrainingStatus.Data = trainingStatus;
                TextBoxTrainingStatus.ToolTip = trainingStatus;
                LabelCache labelCache = LabelCache.GetRuntimeCacheInstance();
                var label = labelCache.GetLabelByName("AITrainingStarted");
                Page.StatusBar.WriteSuccess(label.Value);
            }
            else
            {
                LabelCache labelCache = LabelCache.GetRuntimeCacheInstance();
                var label = labelCache.GetLabelByName("AITrainingFailed");
                Page.StatusBar.WriteError(label.Value.Replace("#ErrorMsg.Name", result.ExceptionData.ToString()));
            }
        }


        private void GetAITrainingServerStatus()
        {
            // Retrieve the configured training server name
            string trainConfigName = AITrainingServerConfig.Data != null ? (AITrainingServerConfig.Data as NamedObjectRef).Name : "";

            if (!string.IsNullOrEmpty(trainConfigName))
            {
                WebClientPortal.AIServerService aiService = new WebClientPortal.AIServerService();

               
                string trainingStatus = string.Empty;
                OM.ResultStatus result = aiService.GetTrainingStatus(trainConfigName, out trainingStatus);

                if (result.IsSuccess)
                {
                    TextBoxTrainingStatus.Data = trainingStatus;
                    TextBoxTrainingStatus.ToolTip = trainingStatus;
                }
            }
        }


        //JJR: script not currently used, but original intent was to call AIServerService from client script.
        //      might be easier to do polling to query for training status from there.
        //      just didn't get that far during refactor, so commenting out for now...
        //protected override IEnumerable<ScriptReference> GetScriptReferences()
        //{
        //    yield return new ScriptReference("~/Scripts/CRModules.js");
        //    yield return new ScriptReference("~/Scripts/ShopFloorSettings.js");
        //}


    }
}
