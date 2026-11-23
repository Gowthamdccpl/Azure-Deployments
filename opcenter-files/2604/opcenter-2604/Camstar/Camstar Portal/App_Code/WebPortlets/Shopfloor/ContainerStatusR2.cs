// Copyright Siemens 2025
using Camstar.WebPortal.FormsFramework.WebControls;
using Camstar.WebPortal.FormsFramework.WebGridControls;
using System;
using System.Web.UI;

namespace Camstar.WebPortal.WebPortlets.Shopfloor
{
    public class ContainerStatusR2 : MatrixWebPartM
    {
        protected virtual Button BtnActivitySelection
        {
            get { return Page.FindCamstarControl("BtnActivitySelection") as Button; }
        }

        protected virtual InquiryControl ContainerStatusActivityStep
        {
            get { return Page.FindCamstarControl("ContainerStatus_CurrentActivityStep") as InquiryControl; }
        }

        protected virtual ContainerListGrid Container
        {
            get { return Page.FindCamstarControl("ContainerStatus_ContainerName") as ContainerListGrid; }
        }

        protected override void OnPreRender(EventArgs e)
        {
            base.OnPreRender(e);

            if (Container?.Data != null && BtnActivitySelection != null && BtnActivitySelection.Visible && !Page.IsFloatingFrame)
            {
                // open activity popup if activity step is not yet selected and no error for the container entered
				if ((Page.StatusBar as StatusBarControl).MessageType != StatusBarControl.StatusBarMessageType.Error && string.IsNullOrEmpty(ContainerStatusActivityStep?.Data?.ToString()))
                    ScriptManager.RegisterStartupScript(Page.Form, Page.Form.GetType(), "openActivityPopup", string.Format("showActivitySelectionPopup();"), true);
            }
        }
    }
}
