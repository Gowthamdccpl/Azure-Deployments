// Copyright Siemens 2025  
using System;
using System.Collections.Generic;
using System.Web.UI;
using CWC = Camstar.WebPortal.FormsFramework.WebControls;
using OM = Camstar.WCF.ObjectStack;
using Camstar.WebPortal.FormsFramework.WebGridControls;
using Camstar.WebPortal.Personalization;

namespace Camstar.WebPortal.WebPortlets
{
    public class AIServerMaint : MatrixWebPart
    {
        protected virtual CWC.TextBox DBPassword { get { return Page.FindCamstarControl("ObjectChanges_DBPassword") as CWC.TextBox; } }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
        }

        public override void GetInputData(OM.Service serviceData)
        {
            base.GetInputData(serviceData);
            OM.AIServerMaint changes = (OM.AIServerMaint)serviceData;
            if (changes.ObjectChanges != null)
            {
                if (changes.ObjectChanges.DBPassword != null)
                {
                    if (DBPassword.Data != null)
                    {
                        changes.ObjectChanges.DBPassword = Camstar.Util.CryptUtil.Encrypt(DBPassword.Data.ToString());
                    }
                }
            }

        }
    }
}
