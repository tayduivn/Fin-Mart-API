var express = require('express');
var router = express.Router();
var con=require('../bin/dbconnection.js');
var User = require('../model/user.js');
var getvehicalcity = require('../controller/getvehiclecity');
var getVehicleInfo = require('../controller/vehicleinfo');
var smarthealth = require('../controller/smarthealth');
var getVehicleDetail=require('../controller/getvehicledetail');
var insertFBARegistration =require('../controller/fbaregistration');
var loan=require('../controller/loancontroller');
var otp=require('../controller/OTPController');
var CityAndState = require('../controller/CityAndState');
var insurancecompany = require('../controller/ProfessionalInfoController');
var vehicle = require('../controller/VehicleController');

var posp = require('../controller/POSPRegistrationController');


var fpass = require('../controller/UserController');

var balancetransfer = require('../controller/BalanceTransferController');
//var setcodeapplibtransfer = require('../controller/SetQuodeApplicationBalanceTransfer.js');
//var deletebtransfer = require('../controller/DeleteBalanceTransfer');


var Mailer = require('../controller/MailController');
var base = require('../controller/baseController');

var login = require('../controller/LoginController');
var personalloan = require('../controller/PersonalLoanController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Calling Api........ is that what you expected.');
});
//route to authenticate user
router.post('/authenticate', function(req, res, next) {
     check_auth(req.body.email,req.body.pwd,function (data){
         error=data?"":"Come on now! Stop kidding, Enter correct email and password.";
         status=data?1:0;
         result={'status':status,'name':data,'error':error};
         res.send(result);
     }); 
});
//check authentication
function check_auth(email,pwd,callback){
User.find({ username: email,password:pwd }, function(err, user) {
  if (err) throw err;

  // object of the user
  console.log(user);
  callback(user[0]?user[0].name:"");
});
}

router.get('/get-city-vehicle', function(req, res, next) {
    getvehicalcity(req,res,next);
});

router.post('/vehicle-info', function(req, res, next) {
    getVehicleInfo(req,res,next);
});

router.post('/smart-health', function(req, res, next) {
    smarthealth.smarthealth(req,res,next);
});
router.post('/vehicle-details', function(req, res, next) {
    getVehicleDetail(req,res,next);
});

router.post('/save-loan-request', function(req, res, next) {
    loan.saveLoanData(req,res,next);
});

router.post('/get-loan-request', function(req, res, next) {
    loan.getLoanData(req,res,next);
});

router.post('/delete-loan-request-loan', function(req, res, next) {
    loan.deleteLoanRequestById(req,res,next);
});

router.post('/set-quote-to-application-loan', function(req, res, next) {
    loan.setQuoteToApplication(req,res,next);
});

router.post('/insert-fba-registration', function(req, res, next) {
  insertFBARegistration(req,res,next);
  // console.log(req.body.name);
});
router.post('/get-city-and-state', function(req, res, next) {
    CityAndState.getCityAndState(req,res,next);
});


router.post('/generate-otp', function(req, res, next) {
  otp.SaveOTP(req,res,next);
  // console.log(req.body.name);
});

router.post('/retrive-otp', function(req, res, next) {
  otp.GetOTP(req,res,next);
  // console.log(req.body.name);
});

router.post('/login', function(req, res, next) {
  login(req,res,next);
  // console.log(req.body.name);
});

router.get('/get-insurance-company', function(req, res, next) {
  insurancecompany(req,res,next);
});

router.post('/manage-vehicle', function(req, res, next) {
  vehicle.managevehicle(req,res,next);
});

router.post('/get-vehicle-request', function(req, res, next) {
  vehicle.getvehiclerequest(req,res,next);
});
router.post('/send-mail', function(req, res, next) {
  
  Mailer.send(req.body,function(status){
      if(status===1){
          base.send_response("Message send Success Fully", "sent", res);
      }else{
          base.send_response("cant send message", null, res);
      }
      });
  });
router.post('/set-quote-to-application-vehicle', function(req, res, next) {
  vehicle.quotetoapplicationvehicle(req,res,next);
});

//Delete vehicle request
router.post('/delete-vehicle-request', function(req, res, next) {
  vehicle.deleteVehicleRequest(req,res,next);
});


//POSP Registration
router.post('/posp-registration', function(req, res, next) {  
  var posp = require('../controller/POSPRegistrationController');
  posp.pospregistration(req,res,next);
});


//forgate password
router.post('/forgotPassword', function(req, res, next) {
  fpass(req,res,next);
});

//BalanceTransfer
router.post('/ManageBalanceTransfer', function(req, res, next) {
  balancetransfer.BalanceTransfer(req,res,next);
});
  //Set Code Application Balance Transfer
  router.post('/set-Quote-application-balance-transfer', function(req, res, next) {
  balancetransfer.SetQuoteApplicationBalanceTransfer(req,res,next);
});

//DeleteBalanceTransfer
router.post('/delete-balance-transfer', function(req, res, next) {
  balancetransfer.DeleteBalanceTransfer(req,res,next);
});

router.post('/get-balance-transfer-request', function(req, res, next) {
  balancetransfer.getbalancetransferrequest(req,res,next);
});
//Manage Personal Loan(Insert and Update)
router.post('/manage-personalloan', function(req, res, next) {
  personalloan.managePersonalLoan(req,res,next);
});

//get Personal Loan request
router.post('/get-personalloan-request', function(req, res, next) {
  personalloan.getPersonalLoan(req,res,next);
});

//set quote to application in personal loan
router.post('/set-quote-to-application-personal-loan', function(req, res, next) {
  personalloan.quoteApplicationPersonalLoan(req,res,next);
});

//delete personal loan request
router.post('/delete-personal-loan-request', function(req, res, next) {
  personalloan.deletePersonalLoan(req,res,next);
});

//get smart health request
router.post('/get-smart-health', function(req, res, next) {
    smarthealth.getHealthRequest(req,res,next);
});

//deactivate all quotes and application 
router.post('/deactivate-vehicle-request', function(req, res, next) {
    vehicle.deactivateVehicleRequest(req,res,next);
});

//get smart health request
router.post('/delete-smart-health', function(req, res, next) {
    smarthealth.deleteHealthRequest(req,res,next);
});

router.post('/set-quote-application-smart-health', function(req, res, next) {
    smarthealth.setQuoteToApplicationHealthRequest(req,res,next);
});

//Update Quote status from Rupeeboss server
router.post('/update-quote-status', function(req, res, next) {
    var transaction = require('../controller/TransactionController');
    transaction.UpdateQuotStatus(req,res,next);
});

//Update applciation no from Rupeeboss server
router.post('/update-application-no', function(req, res, next) {
    var transaction = require('../controller/TransactionController');
    transaction.UpdateApplnNo(req,res,next);
});

//Update posp status. This will be triggered from policyboss
router.post('/update-posp-status', function(req, res, next) {
    var transaction = require('../controller/TransactionController');
    transaction.UpdatePOSPStatus(req,res,next);
});

router.post('/update-bank-id', function(req, res, next) {
  var transaction = require('../controller/TransactionController');
   transaction.UpdateBankId(req,res,next);
});

router.post('/quote-to-application-status', function(req, res, next) {
  var transaction = require('../controller/TransactionController');
  transaction.UpdateQuoteToApplicationStatus(req,res,next);
});

router.post('/my-account', function(req, res, next) {
  var fbaupdate = require('../controller/MyAccountController');
  fbaupdate.FBAUpdateAccount(req,res,next);
});

router.post('/pending-cases', function(req, res, next) {
  var PendingCase = require('../controller/PendingCaseController');
  PendingCase.pendingCases(req,res,next);
});

router.post('/get-ifsc-code', function(req, res, next) {
  var transaction = require('../controller/TransactionController');
  transaction.getIFSCCode(req,res,next);
});

router.post('/get-my-account', function(req, res, next) {
  var fbaupdate = require('../controller/MyAccountController');
  fbaupdate.GetMyAccount(req,res,next);
});

router.post('/get-posp-detail', function(req, res, next) {  
  var posp = require('../controller/POSPRegistrationController');
  posp.GetPOSPDetails(req,res,next);
});

router.post('/insert-tracking', function(req, res, next) {
  var logs = require('../controller/TrackingController');
  logs(req,res,next);
});

router.post('/sales-material-product', function(req, res, next) {
  var salesmaterial = require('../controller/SalesMaterialController');
  salesmaterial.GetSalesMaterial(req,res,next);
});

router.post('/sales-material-product-details', function(req, res, next) {
  var salesmaterial = require('../controller/SalesMaterialController');
  salesmaterial.GetSalesMaterialDocs(req,res,next);
});

router.post('/delete-pending-cases', function(req, res, next) {
  var PendingCase = require('../controller/PendingCaseController');
  PendingCase.DeleteQuoteFromPendingCase(req,res,next);
});

router.post('/update-referer-code', function(req, res, next) {
  var referal = require('../controller/ReferalController');
  referal.UpdateRefererCode(req,res,next);
});

router.post('/contact-us', function(req, res, next) {
  var contact = require('../controller/ContactusController');
  contact(req,res,next);
});

// insert backoffice logs

router.post('/insert-dc-logs', function(req, res, next) {
  let backofficelogs = require('../controller/BOLogsController');
  backofficelogs(req,res,next);
});
//fba doc upload
router.post('/upload-doc', function (req, res, next) {
  let Upload = require('../controller/UploadController');
  //console.log(req.body);

  Upload.save(req,res);
 
});

router.post('/update-notification', function(req, res, next) {
  var notification = require('../controller/NotificationController');
  notification.UserNotificationOpen(req,res,next);
});

router.post('/whats-new', function(req, res, next) {
  var whatsnew = require('../controller/WhatsNewController');
  whatsnew(req,res,next);
});

router.post('/credit-card-rbl', function(req, res, next) {
  var creditcard = require('../controller/CreditCardController');
  creditcard.creditCardRBL(req,res,next);
});

router.post('/get-credit-card-data', function(req, res, next) {
  var creditcard = require('../controller/CreditCardController');
  creditcard.getCreditCardData(req,res,next);
});

router.post('/get-ticket-categories', function (req, res, next) {
  var ticket = require('../controller/RaiseATicketController');
  ticket.getTicketCategories(req,res);
});

router.post('/get-saved-creditcard-info', function(req, res, next) {
  var creditcard = require('../controller/CreditCardController');
  creditcard.getSavedCreditCardInfo(req,res,next);
});

router.post('/get-rbl-city', function(req, res, next) {
  var creditcard = require('../controller/CreditCardController');
  creditcard.getRBLCity(req,res,next);
});

router.post('/get-constant-data', function(req, res, next) {
  var constant = require('../controller/ConstantController');
  constant.GetConstantData(req,res,next);
});

router.post('/get-notification-data', function(req, res, next) {
  var notification = require('../controller/NotificationController');
  notification.GetNotificationList(req,res,next);
});


router.post('/create-ticket', function (req, res, next) {
  var ticket = require('../controller/RaiseATicketController');
  ticket.createTicket(req,res);
 
});

router.post('/get-ticket-request', function(req, res, next) {
  var ticket=require('../controller/RaiseATicketController');
  ticket.getTicketRequest(req,res,next);
  // console.log(req.body.name);
});

router.post('/credit-card-icici', function(req, res, next) {
  var creditcard = require('../controller/CreditCardController');
  creditcard.creditCardICICI(req,res,next);
});

router.post('/GetCompareBenefits', function(req, res, next) {
    smarthealth.GetCompareBenefits(req,res,next);
});

router.post('/compare-premium', function(req, res, next) {
    smarthealth.ComparePremium(req,res,next);
});
router.post('/quick-lead', function(req, res, next) {
  var quicklead=require('../controller/QuickleadController');
    quicklead.QuickLead(req,res,next);
<<<<<<< HEAD
=======
});

router.post('/set-loan-id', function(req, res, next) {
  var loan=require('../controller/PendingController');
    loan.GetLoanID(req,res,next);
>>>>>>> 4fe1ab7076add994bede33b65b0d3421e054c9e6
});
router.post('/send-sms', function (req, res, next) {
  var SMS = require('../controller/SMSController');
  SMS.send(req,res);
 
});
<<<<<<< HEAD

router.post('/set-loan-id', function(req, res, next) {
  var loan=require('../controller/PendingController');
    loan.GetLoanID(req,res,next);
});

router.post('/get-mps-data', function (req, res, next) {
  var MPSdata = require('../controller/MPSController');
  MPSdata.MPSControllerParameter(req,res,next);
});


router.post('/send-notification', function (req, res, next) {
  var sendnoti = require('../controller/SendNotificationController');
  sendnoti(req,res,next);
});


router.post('/premium-initiate-wrapper',function(req,res,next){
  vehicle.premiumInitiateWrapper(req,res);
});
router.post('/premium-list-db-wrapper',function(req,res,next){
  vehicle.premiumListDbWrapper(req,res);

});

module.exports = router;
