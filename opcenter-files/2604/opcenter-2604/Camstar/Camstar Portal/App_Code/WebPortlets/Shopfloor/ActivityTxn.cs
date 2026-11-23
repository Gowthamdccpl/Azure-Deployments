// Copyright Siemens 2026
using Camstar.WCF.ObjectStack;
using Camstar.WCF.Services;
using Camstar.WebPortal.FormsFramework.Utilities;
using Camstar.WebPortal.FormsFramework.WebControls;
using Camstar.WebPortal.FormsFramework.WebGridControls;
using Camstar.WebPortal.Personalization;
using Camstar.WebPortal.WebPortlets.Modeling;
using System;
using System.Activities.Debugger;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CWC = Camstar.WebPortal.FormsFramework.WebControls;
using OM = Camstar.WCF.ObjectStack;
using WC = CamstarPortal.WebControls;

namespace Camstar.WebPortal.WebPortlets.Shopfloor
{
    public class ActivityTxn : MatrixWebPart
    {
        protected virtual CWC.NamedSubentity ActivityTxnCurrentStep { get { return Page.FindCamstarControl("CurrentStep") as CWC.NamedSubentity; } }
        protected virtual CWC.NamedSubentity ActivityTxnNextStep { get { return Page.FindCamstarControl("NextStep") as CWC.NamedSubentity; } }
        protected virtual DropDownList ActivityTxnStatus { get { return Page.FindCamstarControl("Status") as DropDownList; } }
        protected virtual DropDownList ActivityTxnOperation { get { return Page.FindCamstarControl("Operation") as DropDownList; } }
        protected virtual TextBox ActivityTxnQuantity { get { return Page.FindCamstarControl("Quantity") as TextBox; } }
        protected virtual ContainerListGrid HiddenSelectedContainer { get { return Page.FindCamstarControl("HiddenSelectedContainer") as ContainerListGrid; } }
        protected virtual ContainerRef CurrentContainer { get { return HiddenSelectedContainer?.Data as ContainerRef; } }
        protected virtual JQDataGrid ActivityTxnWorkflowStatusGrid { get { return Page.FindCamstarControl("ActivityWorkflowStatus") as JQDataGrid; } }
        protected virtual CWC.NamedObject ActivityTxnResource { get { return Page.FindCamstarControl("ActivityTxn_Resource") as CWC.NamedObject; } }
        protected virtual CWC.InquiryControl ContainerStatusActivityStep { get { return Page.FindCamstarControl("ContainerStatus_CurrentActivityStep") as CWC.InquiryControl; } }
        protected virtual CWC.Button BtnActivitySelection { get { return Page.FindCamstarControl("BtnActivitySelection") as CWC.Button; } }
        protected virtual CWC.CheckBox ActivityTxnSubmitCompleteActivity { get { return Page.FindCamstarControl("CompleteActivity") as CWC.CheckBox; } }
        protected virtual CWC.CheckBox ActivityTxnStepIsAutoParallel { get { return Page.FindCamstarControl("ActivityTxn_StepIsAutoParallel") as CWC.CheckBox; } }
        protected virtual CWC.TextBox ActivityTxnHiddenStepHolder { get { return Page.FindCamstarControl("ActivityTxn_SelectActivity") as CWC.TextBox; } }
        protected virtual CWC.TextBox Comments { get { return Page.FindCamstarControl("Shopfloor_Comments") as CWC.TextBox; } }
        protected virtual CWC.CheckBox ActivityTxnStepIsLastStep { get { return Page.FindCamstarControl("ActivityTxn_StepIsLastStep") as CWC.CheckBox; } }
        protected virtual CWC.CheckBox ActivityTxnStepIsFirstStep { get { return Page.FindCamstarControl("ActivityTxn_StepIsFirstStep") as CWC.CheckBox; } }
        protected virtual CWC.TextBox ActivityTxnTrackQtyString { get { return Page.FindCamstarControl("ActivityTxn_TrackQtyString") as CWC.TextBox; } }
        private CWC.RevisionedObject DataCollectsDef { get { return Page.FindCamstarControl("DataCollectionDef") as CWC.RevisionedObject; } }
        private WC.ShopFloorDCControl ParametricData { get { return Page.FindCamstarControl("ParametricData") as WC.ShopFloorDCControl; } }

        protected string ErrorMessage { get; set; }
        protected string SuccessMessage { get; set; }

        private string[] ActivityTxnType = { "ActivityStart", "ActivityNext", "ActivityComplete", "ActivityEndProcessing" };

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            ActivityTxnCurrentStep.DataChanged += ActivityTxnCurrentStep_DataChanged;
            PrepareOperationField();
            ActivityTxnOperation.DataChanged += ActivityTxnOperation_DataChanged;
            HiddenSelectedContainer.DataChanged += HiddenSelectedContainer_DataChanged;
            DataCollectsDef.DataChanged += DataCollectsDef_DataChanged;
            ActivityTxnWorkflowStatusGrid.RowSelected += ActivityTxnWorkflowStatusGrid_RowSelected;
        }

        protected override void OnPreRender(System.EventArgs e)
        {
            base.OnPreRender(e);
            if (!string.IsNullOrEmpty(SuccessMessage))
                Page.StatusBar.WriteSuccess(SuccessMessage);
            if (!string.IsNullOrEmpty(ErrorMessage))
                Page.StatusBar.WriteError(ErrorMessage);

            if (ContainerStatusActivityStep != null)
                ContainerStatusActivityStep.Visible = false;
            if (BtnActivitySelection != null)
                BtnActivitySelection.Visible = false;
        }


        public override void ClearValues(Service serviceData)
        {
            ActivityTxnWorkflowStatusGrid.ClearData();
            ActivityTxnWorkflowStatusGrid.OriginalData = null;
            ActivityTxnWorkflowStatusGrid.GridContext.CurrentPage = 1;

            base.ClearValues(serviceData);
        }

        public override void WebPartCustomAction(object sender, Personalization.CustomActionEventArgs e)
        {
            base.WebPartCustomAction(sender, e);

            if (ActivityTxnOperation.Data == null)
            {
                ErrorMessage = "Activity Service is required.";
                return;
            }

            string operation = ActivityTxnOperation.Data.ToString();

            if (operation == "ActivityStart")
                ActivityStart();
            else if (operation == "ActivityComplete")
                ActivityComplete();
            else if (operation == "ActivityNext")
                ActivityNext();
            else if (operation == "ActivityEndProcessing")
                ActivityEndProcessing();
            else if (operation == "ActivitySetStatus")
                ActivitySetStatus();

        }

        #region ActivityStart
        public void ActivityStart()
        {
            if (ActivityTxnCurrentStep.Data == null)
            {
                ErrorMessage = "Current Acivity Step is required.";
                return;
            }

            string currentStepName = (ActivityTxnCurrentStep.Data as NamedSubentityRef).Name;
            Primitive<double> qtyToProcess = ActivityTxnQuantity.Data != null ? Convert.ToDouble(ActivityTxnQuantity.Data.ToString()) : 0;

            var data = new OM.ActivityStart
            {
                Container = CurrentContainer,
                Comments = Comments.Data != null ? Comments.Data.ToString() : null,
                CurrentStepName = currentStepName,
                QtyToProcess = qtyToProcess,
                Resource = ActivityTxnResource.Data as NamedObjectRef
            };

            if (ParametricData != null)
            {
                DataPointSummary[] dataPointSummary = ParametricData.GetDataPointSummary();
                if (dataPointSummary != null && dataPointSummary.Length > 0)
                {
                    data.ParametricData = dataPointSummary[0];
                    data.CurrentActivityName = currentStepName;
                }
            }

            var request = new ActivityStart_Request
            {
                Info = new ActivityStart_Info
                {
                }
            };

            var service = new ActivityStartService(FrameworkManagerUtil.GetFrameworkSession().CurrentUserProfile);
            ActivityStart_Result result;
            ResultStatus rs = service.ExecuteTransaction(data, request, out result);
            if (rs.IsSuccess)
            {
                Page.ShopfloorReset(null, null);
                ActivityTxnWorkflowStatusGrid.ClearData();
                ActivityTxnWorkflowStatusGrid.BoundContext.Reload(new ClientGridState());
                HideFields();
                SuccessMessage = rs.Message;
            }
            else
            {
                ErrorMessage = rs.ExceptionData.Description;
            }
        }
        #endregion

        #region ActivityComplete
        public void ActivityComplete()
        {
            if (ActivityTxnCurrentStep.Data == null)
            {
                ErrorMessage = "Current Acivity Step is required.";
                return;
            }

            string currentStepName = (ActivityTxnCurrentStep.Data as NamedSubentityRef).Name;
            Primitive<double> qtyToProcess = ActivityTxnQuantity.Data != null ? Convert.ToDouble(ActivityTxnQuantity.Data.ToString()) : 0;

            var data = new OM.ActivityComplete
            {
                Container = CurrentContainer,
                Comments = Comments.Data != null ? Comments.Data.ToString() : null,
                CurrentStepName = currentStepName,
                QtyToProcess = qtyToProcess
            };

            if (ParametricData != null)
            {
                DataPointSummary[] dataPointSummary = ParametricData.GetDataPointSummary();
                if (dataPointSummary != null && dataPointSummary.Length > 0)
                {
                    data.ParametricData = dataPointSummary[0];
                    data.CurrentActivityName = currentStepName;
                }
            }

            var request = new ActivityComplete_Request
            {
                Info = new ActivityComplete_Info
                {
                }
            };

            var service = new ActivityCompleteService(FrameworkManagerUtil.GetFrameworkSession().CurrentUserProfile);
            ActivityComplete_Result result;
            ResultStatus rs = service.ExecuteTransaction(data, request, out result);
            if (rs.IsSuccess)
            {
                Page.ShopfloorReset(null, null);
                ActivityTxnWorkflowStatusGrid.ClearData();
                ActivityTxnWorkflowStatusGrid.BoundContext.Reload(new ClientGridState());
                HideFields();
                SuccessMessage = rs.Message;
            }
            else
            {
                ErrorMessage = rs.ExceptionData.Description;
            }

        }
        #endregion

        #region ActivityNext
        public void ActivityNext()
        {
            if (ActivityTxnCurrentStep.Data == null)
            {
                ErrorMessage = "Current Acivity Step is required.";
                return;
            }

            string currentStepName = (ActivityTxnCurrentStep.Data as NamedSubentityRef).Name;
            string nextStepName = ActivityTxnNextStep.Data != null ? (ActivityTxnNextStep.Data as NamedSubentityRef).Name : null;
            Primitive<double> qtyToProcess = ActivityTxnQuantity.Data != null ? Convert.ToDouble(ActivityTxnQuantity.Data.ToString()) : 0;
            Boolean CompleteActivityFlag = false;
            if (ActivityTxnSubmitCompleteActivity != null && ActivityTxnSubmitCompleteActivity.IsChecked)
                CompleteActivityFlag = true;

            var data = new OM.ActivityNext
            {
                Container = CurrentContainer,
                Comments = Comments.Data != null ? Comments.Data.ToString() : null,
                CurrentStepName = currentStepName,
                NextStepName = nextStepName,
                QtyToProcess = qtyToProcess,
                Resource = ActivityTxnResource.Data as NamedObjectRef,
                CompleteActivity = CompleteActivityFlag
            };

            if (ParametricData != null)
            {
                DataPointSummary[] dataPointSummary = ParametricData.GetDataPointSummary();
                if (dataPointSummary != null && dataPointSummary.Length > 0)
                {
                    data.ParametricData = dataPointSummary[0];
                    data.CurrentActivityName = currentStepName;
                }
            }

            var request = new ActivityNext_Request
            {
                Info = new ActivityNext_Info
                {
                }
            };

            var service = new ActivityNextService(FrameworkManagerUtil.GetFrameworkSession().CurrentUserProfile);
            ActivityNext_Result result;
            ResultStatus rs = service.ExecuteTransaction(data, request, out result);
            if (rs.IsSuccess)
            {
                Page.ShopfloorReset(null, null);
                ActivityTxnWorkflowStatusGrid.ClearData();
                ActivityTxnWorkflowStatusGrid.BoundContext.Reload(new ClientGridState());
                HideFields();
                SuccessMessage = rs.Message;
            }
            else
            {
                ErrorMessage = rs.ExceptionData.Description;
            }

        }
        #endregion

        #region ActivityEndProcessing
        public void ActivityEndProcessing()
        {
            if (ActivityTxnCurrentStep.Data == null)
            {
                ErrorMessage = "Current Acivity Step is required.";
                return;
            }

            string currentStepName = (ActivityTxnCurrentStep.Data as NamedSubentityRef).Name;
            Primitive<double> qtyToProcess = ActivityTxnQuantity.Data != null ? Convert.ToDouble(ActivityTxnQuantity.Data.ToString()) : 0;

            var data = new OM.ActivityEndProcessing
            {
                Container = CurrentContainer,
                Comments = Comments.Data != null ? Comments.Data.ToString() : null,
                CurrentStepName = currentStepName,
                QtyToProcess = qtyToProcess
            };

            if (ParametricData != null)
            {
                DataPointSummary[] dataPointSummary = ParametricData.GetDataPointSummary();
                if (dataPointSummary != null && dataPointSummary.Length > 0)
                {
                    data.ParametricData = dataPointSummary[0];
                    data.CurrentActivityName = currentStepName;
                }
            }

            var request = new ActivityEndProcessing_Request
            {
                Info = new ActivityEndProcessing_Info
                {
                }
            };

            var service = new ActivityEndProcessingService(FrameworkManagerUtil.GetFrameworkSession().CurrentUserProfile);
            ActivityEndProcessing_Result result;
            ResultStatus rs = service.ExecuteTransaction(data, request, out result);
            if (rs.IsSuccess)
            {
                Page.ShopfloorReset(null, null);
                ActivityTxnWorkflowStatusGrid.ClearData();
                ActivityTxnWorkflowStatusGrid.BoundContext.Reload(new ClientGridState());
                HideFields();
                SuccessMessage = rs.Message;
            }
            else
            {
                ErrorMessage = rs.ExceptionData.Description;
            }

        }
        #endregion

        #region ActivitySetStatus
        public void ActivitySetStatus()
        {
            if (ActivityTxnCurrentStep.Data == null)
            {
                ErrorMessage = "Current Acivity Step is required.";
                return;
            }

            if (ActivityTxnStatus.Data == null)
            {
                ErrorMessage = "Status is required.";
                return;
            }

            string currentStepName = (ActivityTxnCurrentStep.Data as NamedSubentityRef).Name;
            var activityState = (ActivityStateEnum)ActivityTxnStatus.Data;
            Primitive<double> qtyToProcess = ActivityTxnQuantity.Data != null ? Convert.ToDouble(ActivityTxnQuantity.Data.ToString()) : 0;

            var data = new OM.ActivitySetStatus
            {
                Container = CurrentContainer,
                Comments = Comments.Data != null ? Comments.Data.ToString() : null,
                CurrentStepName = currentStepName,
                ActivityState = activityState,
                QtyToProcess = qtyToProcess
            };

            var request = new ActivitySetStatus_Request
            {
                Info = new ActivitySetStatus_Info
                {
                }
            };

            var service = new ActivitySetStatusService(FrameworkManagerUtil.GetFrameworkSession().CurrentUserProfile);
            ActivitySetStatus_Result result;
            ResultStatus rs = service.ExecuteTransaction(data, request, out result);
            if (rs.IsSuccess)
            {
                Page.ShopfloorReset(null, null);
                ActivityTxnWorkflowStatusGrid.ClearData();
                ActivityTxnWorkflowStatusGrid.BoundContext.Reload(new ClientGridState());
                HideFields();
                SuccessMessage = rs.Message;
            }
            else
            {
                ErrorMessage = rs.ExceptionData.Description;
            }

        }
        #endregion

        #region DataCollection
        public override void RequestValues(Info serviceInfo, Service serviceData)
        {
            base.RequestValues(serviceInfo, serviceData);

            if (serviceData is ContainerTxn)
            {
                (serviceData as ContainerTxn).DataCollectionDef = DataCollectsDef.Data as RevisionedObjectRef;
                (serviceData as ContainerTxn).Container = CurrentContainer;

                if (!string.IsNullOrEmpty(ActivityTxnCurrentStep?.Text))
                    (serviceData as ContainerTxn).CurrentActivityName = ActivityTxnCurrentStep?.Text;

            }

            if (serviceInfo is ContainerTxn_Info)
            {
                (serviceInfo as ContainerTxn_Info).DataCollectionDef = new Info(true);
                (serviceInfo as ContainerTxn_Info).HasDataCollection = new Info(true);
            }
            ParametricData.Visible = true;
            ParametricData.RequestValuesWithoutComputation(serviceData as ContainerTxn, serviceInfo as ContainerTxn_Info);
        }
        public override void DisplayValues(Service serviceData)
        {
            ParametricData.DisplayValues(serviceData as ShopFloor);
            base.DisplayValues(serviceData);
        }
        public void PerformResolveParametricData()
        {
            string selectedOperation = ActivityTxnOperation?.Data?.ToString();
            string selectedActivityStep = ActivityTxnCurrentStep?.Text;

            ParametricData.Visible = false; ParametricData.Clean(); ParametricData.Clear();
            DataCollectsDef.ClearData();

            if (!string.IsNullOrEmpty(selectedOperation) && !string.IsNullOrEmpty(selectedActivityStep))
            {
                if (selectedOperation == "ActivityStart")
                {
                    ActivityStart inputData = new OM.ActivityStart
                    {
                        Container = CurrentContainer,
                        CurrentActivityName = selectedActivityStep
                    };

                    ActivityStart_Info info = new ActivityStart_Info
                    {
                        DataCollectionDef = new Info(true),
                        HasDataCollection = new Info(true)
                    };
                    info.DataCollectionDef.RequestSelectionValues = true;

                    UserProfile profile = HttpContext.Current.Session[Camstar.WebPortal.Constants.SessionConstants.UserProfile] as UserProfile;
                    ActivityStartService serv = new ActivityStartService(profile);

                    ActivityStart_Result result = null;
                    ResultStatus resultStatus = serv.ResolveParametricData(inputData, new ActivityStart_Request { Info = info }, out result);

                    if (resultStatus.IsSuccess && result.Value.HasDataCollection.Value)
                        DataCollectsDef.Data = (result.Value.DataCollectionDef as RevisionedObjectRef);
                }
                else if (selectedOperation == "ActivityComplete")
                {
                    ActivityComplete inputData = new OM.ActivityComplete
                    {
                        Container = CurrentContainer,
                        CurrentActivityName = selectedActivityStep
                    };

                    ActivityComplete_Info info = new ActivityComplete_Info
                    {
                        DataCollectionDef = new Info(true),
                        HasDataCollection = new Info(true)
                    };
                    info.DataCollectionDef.RequestSelectionValues = true;

                    UserProfile profile = HttpContext.Current.Session[Camstar.WebPortal.Constants.SessionConstants.UserProfile] as UserProfile;
                    ActivityCompleteService serv = new ActivityCompleteService(profile);

                    ActivityComplete_Result result = null;
                    ResultStatus resultStatus = serv.ResolveParametricData(inputData, new ActivityComplete_Request { Info = info }, out result);

                    if (resultStatus.IsSuccess && result.Value.HasDataCollection.Value)
                        DataCollectsDef.Data = (result.Value.DataCollectionDef as RevisionedObjectRef);
                }
                else if (selectedOperation == "ActivityNext")
                {
                    ActivityNext inputData = new OM.ActivityNext
                    {
                        Container = CurrentContainer,
                        CurrentActivityName = selectedActivityStep
                    };

                    ActivityNext_Info info = new ActivityNext_Info
                    {
                        DataCollectionDef = new Info(true),
                        HasDataCollection = new Info(true)
                    };
                    info.DataCollectionDef.RequestSelectionValues = true;

                    UserProfile profile = HttpContext.Current.Session[Camstar.WebPortal.Constants.SessionConstants.UserProfile] as UserProfile;
                    ActivityNextService serv = new ActivityNextService(profile);

                    ActivityNext_Result result = null;
                    ResultStatus resultStatus = serv.ResolveParametricData(inputData, new ActivityNext_Request { Info = info }, out result);

                    if (resultStatus.IsSuccess && result.Value.HasDataCollection.Value)
                        DataCollectsDef.Data = (result.Value.DataCollectionDef as RevisionedObjectRef);
                }
                else if (selectedOperation == "ActivityEndProcessing")
                {
                    ActivityEndProcessing inputData = new OM.ActivityEndProcessing
                    {
                        Container = CurrentContainer,
                        CurrentActivityName = selectedActivityStep
                    };

                    ActivityEndProcessing_Info info = new ActivityEndProcessing_Info
                    {
                        DataCollectionDef = new Info(true),
                        HasDataCollection = new Info(true)
                    };
                    info.DataCollectionDef.RequestSelectionValues = true;

                    UserProfile profile = HttpContext.Current.Session[Camstar.WebPortal.Constants.SessionConstants.UserProfile] as UserProfile;
                    ActivityEndProcessingService serv = new ActivityEndProcessingService(profile);

                    ActivityEndProcessing_Result result = null;
                    ResultStatus resultStatus = serv.ResolveParametricData(inputData, new ActivityEndProcessing_Request { Info = info }, out result);

                    if (resultStatus.IsSuccess && result.Value.HasDataCollection.Value)
                        DataCollectsDef.Data = (result.Value.DataCollectionDef as RevisionedObjectRef);
                }
            }
        }

        #endregion

        private void DataCollectsDef_DataChanged(object sender, EventArgs e)
        {
            string selectedOperation = ActivityTxnOperation?.Data?.ToString();
            string selectedActivityStep = ActivityTxnCurrentStep?.Text;

            if (!string.IsNullOrEmpty(selectedOperation) && !string.IsNullOrEmpty(selectedActivityStep) && DataCollectsDef.Data != null)
            {
                Service.LoadServiceValues(selectedOperation, "GetDataPoints");
            }
        }

        private void ActivityTxnOperation_DataChanged(object sender, EventArgs e)
        {
            var SelectedOperation = ActivityTxnOperation.Data?.ToString();
            if (!string.IsNullOrEmpty(SelectedOperation) && ActivityTxnType.Contains(SelectedOperation))
            {
                // *IMPORTANT NOTE Tuple GetDetailsFromGrid => item1: isMetComplete, item2: isStepFoundInTheGrid, item3: isPointingFirstStep, item4: stepStatus, item5: isInqueueQtyContainsValue, item6: qtyCollected
                var (isMetComplete, isPointingFirstStep, collectedQtyValue) = (GetDetailsFromGrid().Item1, GetDetailsFromGrid().Item3, GetDetailsFromGrid().Item6);
                // Next Activity Step Condition
                ActivityTxnNextStep.Visible = ((SelectedOperation.Equals("ActivityNext") && !ActivityTxnStepIsAutoParallel.IsChecked) && !ActivityTxnStepIsLastStep.IsChecked);
                //ActivityTxnNextStep.Required = (ActivityTxnSelectedOperation.Equals("ActivityNext") && !ActivityTxnStepIsAutoParallel.IsChecked);

                // Resource Condition
                ActivityTxnResource.Visible = ((SelectedOperation.Equals("ActivityStart") || SelectedOperation.Equals("ActivityNext")) && !ActivityTxnStepIsLastStep.IsChecked);

                // Complete Activity Checkbox
                ActivityTxnSubmitCompleteActivity.Visible = (SelectedOperation.Equals("ActivityNext") && !ActivityTxnStepIsLastStep.IsChecked && !ActivityTxnStepIsAutoParallel.IsChecked);
                ActivityTxnSubmitCompleteActivity.Enabled = !isMetComplete && !isPointingFirstStep;

                // Quantity
                ActivityTxnQuantity.Visible = !ActivityTxnStepIsLastStep.IsChecked && ActivityTxnTrackQtyString.Data.Equals("True") && (
                    (SelectedOperation.Equals("ActivityStart") && !ActivityTxnStepIsFirstStep.IsChecked) ||
                    (SelectedOperation.Equals("ActivityNext") && !ActivityTxnStepIsAutoParallel.IsChecked) ||
                    SelectedOperation.Equals("ActivityComplete"));

                // Set Value on Quantity field
                if ((!SelectedOperation.Equals(ActivityTxnType.First()) || !isPointingFirstStep) && ActivityTxnTrackQtyString.Data.Equals("True"))
                {
                    ActivityTxnQuantity.Data = collectedQtyValue;
                }
                PerformResolveParametricData();
            }
            else
            {
                HideFields();
            }
        }

        private (bool, bool, bool, string, bool, int) GetDetailsFromGrid()
        {
            var isMetComplete = false;
            var isStepFoundInTheGrid = false;
            var isPointingFirstStep = false;
            var stepStatus = string.Empty;
            var isInqueueQtyContainsValue = false;
            var computeQty = 0;
            var qtyCollection = new Dictionary<string, int>();
            var activityContext = (ActivityTxnWorkflowStatusGrid.GridContext as BoundContext);

            for (int i = 0; i < ActivityTxnWorkflowStatusGrid.GridContext.GetTotalRows(); i++)
            {
                if (GetSelectedGridValue(activityContext, i, "ActivityStatusName").Equals(ActivityTxnCurrentStep.Text))
                {
                    isMetComplete = GetSelectedGridValue(activityContext, i, "ActivityStateString").Equals(ActivityStateEnum.Complete.ToString());
                    isStepFoundInTheGrid = true;
                    isPointingFirstStep = (i == 0);
                    stepStatus = GetSelectedGridValue(activityContext, i, "ActivityStateString").Replace(" ", "");
                    isInqueueQtyContainsValue = int.Parse(GetValueOrDefault(GetSelectedGridValue(activityContext, i, "QtyInQueue"))) > 0;
                    qtyCollection = new Dictionary<string, int>()
                    {
                        ["QtyInQueue"] = int.Parse(GetValueOrDefault(GetSelectedGridValue(activityContext, i, "QtyInQueue"))),
                        ["QtyToProcess"] = int.Parse(GetValueOrDefault(GetSelectedGridValue(activityContext, i, "QtyToProcess"))),
                        ["QtyInProcess"] = int.Parse(GetValueOrDefault(GetSelectedGridValue(activityContext, i, "QtyInProcess"))),
                        ["QtyComplete"] = int.Parse(GetValueOrDefault(GetSelectedGridValue(activityContext, i, "QtyComplete"))),
                        ["QtyMoved"] = int.Parse(GetValueOrDefault(GetSelectedGridValue(activityContext, i, "QtyMoved"))),
                    };

                    // Passing Computed Quantity to computeQty
                    computeQty = ComputeQuantityValue(qtyCollection);
                    break;
                }
            }
            return (isMetComplete, isStepFoundInTheGrid, isPointingFirstStep, stepStatus, isInqueueQtyContainsValue, computeQty);
        }

        private int ComputeQuantityValue(Dictionary<string, int> qtyCollection)
        {
            // Gethers Keys and values supperately in a list first
            List<string> keys = qtyCollection.Keys.ToList();
            List<int> values = qtyCollection.Values.ToList();
            if (values.First() > 0)
            {
                return qtyCollection[keys.First()];
            }
            else if (values[1] > 0)
            {
                return qtyCollection[keys[1]];
            }
            else
            {
                return qtyCollection["QtyComplete"] - qtyCollection["QtyMoved"] + qtyCollection["QtyInProcess"];
            }
        }

        // Gets value from grid with selected index
        private string GetSelectedGridValue(BoundContext activityContext, int index, string column) => activityContext.GetCell(index, column).ToString();

        // Sets default value if the grid contains "" or null
        private string GetValueOrDefault(string value, string defaultValue = "0") => string.IsNullOrEmpty(value) ? defaultValue : value;

        private void ActivityTxnCurrentStep_DataChanged(object sender, EventArgs e)
        {
            // *IMPORTANT NOTE Tuple GetDetailsFromGrid => item1: isMetComplete, item2: isStepFoundInTheGrid, item3: isPointingFirstStep, item4: stepStatus, item5: isInqueueQtyContainsValue, item6: qtyCollected
            var isStepFoundInTheGrid = GetDetailsFromGrid().Item2;
            HideFields();
            ActivityTxnOperation.Data = null;
            if (ActivityTxnCurrentStep.Data != null && !(string.IsNullOrEmpty(ActivityTxnCurrentStep.Text) || string.IsNullOrWhiteSpace(ActivityTxnCurrentStep.Text)))
            {
                if (!isStepFoundInTheGrid)
                {
                    ErrorMessage = $"Selected Activity Step '{ActivityTxnCurrentStep.Text}' is invalid.";
                    ActivityTxnCurrentStep.Data = null;
                    ActivityTxnHiddenStepHolder.Data = null;
                }
                else
                {
                    PerformResolveParametricData();
                }
            }
            else if (string.IsNullOrEmpty(ActivityTxnCurrentStep.Text) || string.IsNullOrWhiteSpace(ActivityTxnCurrentStep.Text))
            {
                ActivityTxnCurrentStep.Data = null;
                ActivityTxnHiddenStepHolder.Data = null;
            }
        }

        private void HideFields()
        {
            ActivityTxnNextStep.Visible = false;
            ActivityTxnResource.Visible = false; ActivityTxnResource.ClearData();
            ActivityTxnSubmitCompleteActivity.Visible = false;
            ActivityTxnQuantity.Visible = false; ActivityTxnQuantity.ClearData();
            ParametricData.Visible = false; ParametricData.Clean(); ParametricData.Clear();
            DataCollectsDef.ClearData();
        }

        private void PrepareOperationField()
        {
            // *IMPORTANT NOTE Tuple GetDetailsFromGrid => item1: isMetComplete, item2: isStepFoundInTheGrid, item3: isPointingFirstStep, item4: stepStatus, item5: isInqueueQtyContainsValue, item6: qtyCollected
            if (ActivityTxnCurrentStep.Data != null)
            {
                var LabelCache = FrameworkManagerUtil.GetLabelCache(System.Web.HttpContext.Current.Session);

                if (LabelCache != null)
                {
                    var (isMetComplete, isStepFoundInTheGrid, isPointingFirstStep, stepStatus, isInqueueQtyContainsValue) =
                        (GetDetailsFromGrid().Item1, GetDetailsFromGrid().Item2, GetDetailsFromGrid().Item3, GetDetailsFromGrid().Item4, GetDetailsFromGrid().Item5);
                    /**
                    * ActivityTxnType References index
                    * 0 - ActivityStart
                    * 1 - ActivityNext
                    * 2 - ActivityComplete
                    * 3 - ActivityEndProcessing
                    */
                    if (isStepFoundInTheGrid)
                    {
                        var GridRowsCount = ActivityTxnWorkflowStatusGrid.GridContext.GetTotalRows();
                        // prepare the number of required Activity Service item for CustomListValueMapItem array memory allocation
                        var indexCount = ((isPointingFirstStep && GridRowsCount == 1) || isMetComplete || stepStatus == ActivityStateEnum.InQueue.ToString()) ? 1
                            : (isInqueueQtyContainsValue && ((isPointingFirstStep && GridRowsCount > 1) || stepStatus == ActivityStateEnum.InProcess.ToString())) ? 3
                            : 2;

                        CustomListValueMapItem[] customListValueMapItems = new CustomListValueMapItem[indexCount];

                        if (indexCount == 1)
                        {
                            var DisplayNameAndValue = string.Empty;
                            DisplayNameAndValue = (stepStatus.Equals(ActivityStateEnum.InQueue.ToString())
                                || (GridRowsCount == 1 && stepStatus.Equals(ActivityStateEnum.InProcess.ToString()) && isInqueueQtyContainsValue))
                                ? LabelCache.GetLabelByName(ActivityTxnType.First()).Name
                                : LabelCache.GetLabelByName(ActivityTxnType[1]).Name;
                            SetValuesIntoCustomListValueMapItem(ref customListValueMapItems, 0, DisplayNameAndValue);
                        }
                        else if (indexCount == 2)
                        {
                            SetValuesIntoCustomListValueMapItem(ref customListValueMapItems, 0, LabelCache.GetLabelByName(ActivityTxnType[1]).Name);
                            SetValuesIntoCustomListValueMapItem(ref customListValueMapItems, 1, LabelCache.GetLabelByName(isPointingFirstStep ? ActivityTxnType.Last() : ActivityTxnType[2]).Name);
                        }
                        else if (indexCount == 3)
                        {
                            SetValuesIntoCustomListValueMapItem(ref customListValueMapItems, 0, LabelCache.GetLabelByName(ActivityTxnType.First()).Name);
                            SetValuesIntoCustomListValueMapItem(ref customListValueMapItems, 1, LabelCache.GetLabelByName(ActivityTxnType[1]).Name);
                            SetValuesIntoCustomListValueMapItem(ref customListValueMapItems, 2, LabelCache.GetLabelByName(isPointingFirstStep ? ActivityTxnType.Last() : ActivityTxnType[2]).Name);

                        }

                        ActivityTxnOperation.CustomListValues = customListValueMapItems;
                    }
                }

            }

        }

        private void SetValuesIntoCustomListValueMapItem(ref CustomListValueMapItem[] customListValueMapItems, int index, string displayNameAndValue)
        {
            customListValueMapItems[index] = new CustomListValueMapItem() { DisplayName = displayNameAndValue, Value = displayNameAndValue };
        }

        private void HiddenSelectedContainer_DataChanged(object sender, EventArgs e)
        {
            ClearValues();
            HideFields();
        }

        private ResponseData ActivityTxnWorkflowStatusGrid_RowSelected(object sender, JQGridEventArgs args)
        {
            ActivityTxnOperation.Data = null;
            return null;
        }

    }
}
