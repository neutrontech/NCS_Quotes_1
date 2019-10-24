/**
 * Created by cneugebauer on 10/23/2015.
 */

function setDefaultsMain() {

  //--set form constants
  FT_CREATE = 1;
  FT_UPDATE = 2;
  FT_READ_ONLY = 3;
  FT_DISABLED = 4;
  FORM_TYPE_BULK_EDIT = 6;
  FT_QUICK_CREATE = 5;
  // also get  form type
  vFormType = Xrm.Page.ui.getFormType();

  // for billto change; default dependents
  Xrm.Page.getAttribute("customerid").addOnChange(setShiptoAccounts);

  // for shipto change; default dependents
  Xrm.Page.getAttribute("ncs_shiptoaccount").addOnChange(setMachineAccounts);
  Xrm.Page.getAttribute("customerid").addOnChange(setMachineAccounts);
}

// set shipto account defaults
function setShiptoAccounts() {

  // Get Billto Account
  var billtoLookup = new Array();
  billtoLookup[0] = new Object();
  billtoLookup = Xrm.Page.getAttribute("customerid").getValue();

  // when billto entered, default shipto..
  if ((billtoLookup[0] != null) && (vFormType == FT_CREATE)) {

    // Default Shipto Account
    var value = new Array();
    value[0] = new Object();
    value[0].id = billtoLookup[0].id;             		//guid
    value[0].name = billtoLookup[0].name;     			//value
    value[0].entityType = billtoLookup[0].entityType;  	//ent name
    Xrm.Page.getAttribute("ncs_shiptoaccount").setValue(value);
  }
}

// set machine loc defaults
function setMachineAccounts() {

    // Get Shipto Account
    var shiptoLookup = new Array();
    shiptoLookup[0] = new Object();
    shiptoLookup = Xrm.Page.getAttribute("ncs_shiptoaccount").getValue();

    // when Shipto entered and insert, default machine loc..
    if (shiptoLookup[0] != null) {

        // Default Machine Location to shipto Account
        var value = new Array();
        value[0] = new Object();
        value[0].id = shiptoLookup[0].id;             		//guid
        value[0].name = shiptoLookup[0].name;     			//value
        value[0].entityType = shiptoLookup[0].entityType;  	//ent name
        Xrm.Page.getAttribute("ncs_machineloc").setValue(value);


    }
}
      


