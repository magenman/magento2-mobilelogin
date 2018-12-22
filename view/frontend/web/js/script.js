require(['jquery', 'jquery/ui'], function($){ 

	jQuery("a.registerlink").attr("href", "javascript:void(0)");
	jQuery("a.registerlink").attr("onClick", "doRegister()");
	
	jQuery("a.ajaxlogin-login").attr("href", "javascript:void(0)");
	jQuery("a.ajaxlogin-login").attr("onClick", "doLogin()");    

  jQuery(".close").click(function(e) {
    	jQuery(".ajax-login-form").css('display','none');
		jQuery(".ajax-register-form").css('display','none');	
		jQuery(".ajax-forgot-form").css('display','none');	
		jQuery(".regcontollererror").css('display','none');		

	});		
   jQuery(".forgotlinking").click(function(e) {
    	jQuery(".ajax-login-form").css('display','none');
		jQuery(".ajax-register-form").css('display','none');
		jQuery(".ajax-forgot-form").css('display','block');			
	    jQuery(".forgotmobileget").css('display','block');
	    jQuery(".forgototpverify").css('display','none');		
	    jQuery(".setnewpass").css('display','none');
		jQuery(".modal input[type='text']").val("");				
		jQuery(".modal input[type='password']").val("");						
		
	});	  
   jQuery(".ajaxlogin-login").click(function(e) {
	   e.preventDefault();
		doLogin();
	});
	jQuery(".registerlink").click(function(e) {
	   e.preventDefault();
	   doRegister();
    
	});	
	jQuery("#loginsubmit").click(function(e) {
	   e.preventDefault();
	   //jQuery(".ajax-login-form").css('display','none');
	   jQuery("#login-please-wait").css('display','block');
	    jQuery("#loginsubmit").css('display','none');	   
	   jQuery(".emailpasswrong").css('display','none');								   
	   jQuery.ajax({
				   url: jQuery('#mobile-login-form').attr('action'),
		   		   type: 'post',
				   data: jQuery('#mobile-login-form').serialize(),
				   xhrFields: {
                   withCredentials: true
                },
	            create: function(response) {
                    var t = response.transport;
                    t.setRequestHeader = t.setRequestHeader.wrap(function(original, k, v) {
                        if (/^(accept|accept-language|content-language|cookie|access-control-allow-origin|access-control-allow-headers|access-control-allow-credentials)$/i.test(k))
                            return original(k, v);
                        if (/^content-type$/i.test(k) &&
                            /^(application\/x-www-form-urlencoded|multipart\/form-data|text\/plain)(;.+)?$/i.test(v))
                            return original(k, v);
                        return;
                    });
                },
                success: function(response) {
					  if(response.error){
						  jQuery(".emailpasswrong").css('display','block');	
						  jQuery(".emailpasswrong span").text(response.message);	
						  jQuery('#login-please-wait').css('display','none');
						  jQuery("#loginsubmit").css('display','block');					
							return;								
						}
						
						if (response.redirect) {
							document.location = response.redirect;
							return;
						}	
                }
            });
	});	
	jQuery("#customerloginsubmit").click(function(e) {
	   e.preventDefault();
	   //jQuery(".ajax-login-form").css('display','none');
	   jQuery("#customer-login-please-wait").css('display','block');
   	   jQuery(".primary").css('display','none');
	   //  jQuery("#loginsubmit").css('display','none');	   
	   jQuery(".emailpasswrong").css('display','none');								   
	   jQuery.ajax({
				   url: jQuery('#customer-login-form').attr('action'),
		   		   type: 'post',
				   data: jQuery('#customer-login-form').serialize(),
				   xhrFields: {
                   withCredentials: true
                },
	            create: function(response) {
                    var t = response.transport;
                    t.setRequestHeader = t.setRequestHeader.wrap(function(original, k, v) {
                        if (/^(accept|accept-language|content-language|cookie|access-control-allow-origin|access-control-allow-headers|access-control-allow-credentials)$/i.test(k))
                            return original(k, v);
                        if (/^content-type$/i.test(k) &&
                            /^(application\/x-www-form-urlencoded|multipart\/form-data|text\/plain)(;.+)?$/i.test(v))
                            return original(k, v);
                        return;
                    });
                },
                success: function(response) {
					  if(response.error){
						  jQuery(".emailpasswrong").css('display','block');	
						  jQuery(".emailpasswrong span").text(response.message);	
						  jQuery('#customer-login-please-wait').css('display','none');
				     	  jQuery(".primary").css('display','block');
	 					  jQuery("#loginsubmit").css('display','block');					
							return;								
						}
						
						if (response.redirect) {
							document.location = response.redirect;
							return;
						}	
                }
            });
	});	
	
	jQuery(".Registerformsubmit").click(function(e) {
		e.preventDefault();
		jQuery("#reg-submit-please-wait").css('display','block');
		jQuery(".Registerformsubmit").css('display','none');
		jQuery(".regcontollererror").css('display','none');
	    var data = jQuery('#ajaxlogin-create-form').serialize();
		
			jQuery.ajax({
				   url: jQuery('#ajaxlogin-create-form').attr('action'),
		   		   type: 'post',
				   data: data,
				   xhrFields: {
                    withCredentials: true
                },
		        create: function(response) {
					
                    var t = response.transport;
                    t.setRequestHeader = t.setRequestHeader.wrap(function(original, k, v) {
                        if (/^(accept|accept-language|content-language|cookie|access-control-allow-origin|access-control-allow-headers|access-control-allow-credentials)$/i.test(k))
                            return original(k, v);
                        if (/^content-type$/i.test(k) &&
                            /^(application\/x-www-form-urlencoded|multipart\/form-data|text\/plain)(;.+)?$/i.test(v))
                            return original(k, v);
                        return;
                    });
                },
                success: function(transport) {
					jQuery("#reg-submit-please-wait").css('display','none');
					jQuery(".Registerformsubmit").css('display','block');
					if (transport.success == "true") {
                        document.location = transport.redirect;
                        return;
                    }
					if (transport.success == "false") {

						jQuery(".regcontollererror span").text(transport.message);	
						jQuery(".regcontollererror").css('display','block');
					}
					
                  
                }, 
				error: function() {
				
				jQuery("#reg-submit-please-wait").css('display','none');
				jQuery(".Registerformsubmit").css('display','block');			
		   		}
            });
    });
	<!-- Start -->
	jQuery(".submit").click(function(e) {
		e.preventDefault();
		$.validator.validateElement($("#email_address"));
		$.validator.validateElement($("#firstname"));
		$.validator.validateElement($("#lastname"));
		$.validator.validateElement($("#password"));
		$.validator.validateElement($("#password-confirmation"));
		
		jQuery("#reg-submit-please-wait").css('display','block');
		jQuery(".customer-progress-indicator").css('display','block');
		jQuery("#customer-register-wait").css('display','block');
		jQuery(".Registerformsubmit").css('display','none');
		jQuery(".regcontollererror").css('display','none');
	    var data = jQuery('.form-create-account').serialize();
		
			jQuery.ajax({
				   url: jQuery('#ajaxlogin-create-form').attr('action'),
		   		   type: 'post',
				   data: data,
				   xhrFields: {
                    withCredentials: true
                },
		        create: function(response) {
					
                    var t = response.transport;
                    t.setRequestHeader = t.setRequestHeader.wrap(function(original, k, v) {
                        if (/^(accept|accept-language|content-language|cookie|access-control-allow-origin|access-control-allow-headers|access-control-allow-credentials)$/i.test(k))
                            return original(k, v);
                        if (/^content-type$/i.test(k) &&
                            /^(application\/x-www-form-urlencoded|multipart\/form-data|text\/plain)(;.+)?$/i.test(v))
                            return original(k, v);
                        return;
                    });
                },
                success: function(transport) {
					jQuery("#reg-submit-please-wait").css('display','none');
					jQuery(".Registerformsubmit").css('display','block');
					jQuery(".customer-progress-indicator").css('display','none');
					jQuery("#customer-register-wait").css('display','none');

					if (transport.success == "true") {
                        document.location = transport.redirect;
                        return;
                    }
					if (transport.success == "false") {
						jQuery(".messages").css("color","red");
						jQuery(".messages").text(transport.message);	
						jQuery(".regcontollererror span").text(transport.message);	
						jQuery(".regcontollererror").css('display','block');
					}
					
                  
                }, 
				error: function() {
						
				jQuery("#reg-submit-please-wait").css('display','none');
				jQuery(".Registerformsubmit").css('display','block');			
		   		}
            });
    });
	$(document).ready(function(e) {
	    $(".submit").attr('disabled','disabled');
	});

	<!-- End -->
	
    jQuery(".verifyotp").click(function(e) {
		var otp =  jQuery("#otp").val();
		var mobile = jQuery("#mobileget").val();
		jQuery(".blankerror").css('display','none');

		if(isBlank(otp) == false){
			jQuery(".blankerror").css('display','block');
			return false;
		}
		
		jQuery(".checkotperror").css('display','none');
		jQuery("#reg-otp-verify-please-wait").css('display','block');		
		jQuery(".verifyotp").css('display','none');
		jQuery.ajax({
		   url: jQuery(".checkotpurl").val(),
		   type: 'GET',
		   data:{otp:otp,mobile:mobile},
		   success: function(data) {
			   jQuery(".verifyotp").css('display','block');
				jQuery("#reg-otp-verify-please-wait").css('display','none');					   	
				if(data == 'true'){
					jQuery("#createotp").val(otp);
				    jQuery(".otpverify").css('display','none');
        			jQuery(".registraionform").css('display','block');
					jQuery(".submit").prop('disabled', false);

			   }else{
				  jQuery(".checkotperror").css('display','block'); 
			   }
		   },
		    error: function() {
				jQuery("#reg-otp-verify-please-wait").css('display','none');					   					
			    jQuery(".verifyotp").css('display','block');				
		   }
		});
    });
	/*Start */
	jQuery(".create-account-resend-otp").click(function(e) {
       
        jQuery(".regi-sendotp").trigger('click');
		jQuery("#reg-sms-please-wait").css('display','none');
        
    });
	jQuery(".mobileverifyotp").click(function(e) {
		var otp =  jQuery("#mobile-otp").val();
		var mobile = jQuery("#mobile-mobileget").val();
		jQuery(".blankotperror").css('display','none');

		if(isBlank(otp) == false){
			jQuery(".blankotperror").css('display','block');
			return false;
		}
		
		jQuery(".checkotperror").css('display','none');
		jQuery("#reg-otp-verify-please-wait").css('display','block');		
		jQuery(".verifyotp").css('display','none');
		jQuery(this).prop('disabled',true);		
		jQuery.ajax({
		   url: jQuery(".checkotpurl").val(),
		   type: 'GET',
		   data:{otp:otp,mobile:mobile},
		   success: function(data) {
			    jQuery(".verifyotp").css('display','block');
				jQuery("#reg-otp-verify-please-wait").css('display','none');					   	
				if(data == 'true'){
					jQuery("#createotp").val(otp);
				    jQuery(".otpverify").css('display','none');
        			jQuery(".registraionform").css('display','block');
					jQuery(".submit").prop('disabled', false);

			   }else{
				  jQuery(".checkotperror").css('display','block'); 
			   }
			   jQuery(".blankotperror").css('display','none');
			   jQuery('.mobileverifyotp').prop('disabled',false);		
		   },
		    error: function() {
				jQuery("#reg-otp-verify-please-wait").css('display','none');					   					
			    jQuery(".verifyotp").css('display','block');	
				jQuery(this).prop('disabled',false);					
		   }
		});
		
    });
	/*end */
	
	jQuery(".sendotp").click(function(e) {
        var mobile = jQuery("#mobileget").val();
		var url = jQuery(".setdotpurl").val();
 	    	
 	    jQuery(".blankerror").css('display','none'); 
 	    jQuery(".mobileNotValid").css('display','none'); 		
		jQuery(".mobileotpsenderror").css('display','none'); 	
		jQuery(".mobileExist").css('display','none');
			
   	 		
		if(!mobile){
			jQuery(".blankerror").css('display','block'); 
			
			return false;
		}		
		if(validateMobile(mobile) == false){
			jQuery(".mobileNotValid").css('display','block'); 
			return false;
		}
		
 	    jQuery(".sendotp").css('display','none'); 	
 	    jQuery("#reg-sms-please-wait").css('display','block');	
			
		jQuery.ajax({
		   url: url,
		   type:'GET',
		   data:{mobile:mobile},
		   success: function(data) {
			   	 jQuery(".sendotp").css('display','block'); 
		 	     jQuery("#reg-sms-please-wait").css('display','none');				   
			   if(data == 'true'){
				    jQuery("#createmobile").val(mobile);
				    jQuery(".mobileget").css('display','none');
					jQuery(".otpverify").css('display','block');
					
					
			   }else if(data == 'exist'){
				   jQuery(".mobileExist").css('display','block');	
				   
			   }else{
				  jQuery(".mobileotpsenderror").css('display','block'); 
			   }
		   },
		    error: function() {
				   	jQuery(".sendotp").css('display','block');				
			 	    jQuery("#reg-sms-please-wait").css('display','none');				
		   }
		  
		});
    });
	/* for register form */
	jQuery(".regi-sendotp").click(function(e) {

        var mobile = jQuery("#mobile-mobileget").val();
		var url = jQuery(".setdotpurl").val();
 	    	
 	    jQuery(".blankerror").css('display','none'); 
 	    jQuery(".mobileNotValid").css('display','none'); 		
		jQuery(".mobileotpsenderror").css('display','none'); 	
		jQuery(".mobileExist").css('display','none');
		
	   jQuery(".resend").css('display','none');
		jQuery(".sending").css('display','block');	
	
			
		if(!mobile){
			jQuery(".blankerror").css('display','block'); 
			
			return false;
		}		
		if(validateMobile(mobile) == false){
			jQuery(".mobileNotValid").css('display','block'); 
			return false;
		}
		
 	    jQuery(".sendotp").css('display','none'); 	
 	    jQuery("#reg-sms-please-wait").css('display','block');	
		jQuery(this).prop('disabled',true);	
		jQuery.ajax({
		   url: url,
		   type:'GET',
		   data:{mobile:mobile},
		   success: function(data) {
			   	 jQuery(".sendotp").css('display','block'); 
		 	     jQuery("#reg-sms-please-wait").css('display','none');				   
			   if(data == 'true'){
				    jQuery("#createmobile").val(mobile);
				    jQuery(".mobileget").css('display','block');
				    jQuery(".regi-sendotp").css('display','none');
					document.getElementById("mobile-mobileget").readOnly = true;
					jQuery(".otpverify").css('display','block');
					
				    jQuery(".resend").css('display','block');
				    jQuery(".sending").css('display','none');	
						
			   }else if(data == 'exist'){
				   jQuery(".mobileExist").css('display','block');
				   	
				   
			   }else{
				   
				  jQuery(".mobileotpsenderror").css('display','block'); 
			   }
			   jQuery('.regi-sendotp').prop('disabled',false);		
		   },
		    error: function() {

				   	jQuery(".sendotp").css('display','block');				
			 	    jQuery("#reg-sms-please-wait").css('display','none');	
					jQuery(this).prop('disabled',false);					
		   }
		  
		});
		
    });
	
	jQuery(".forgotsendotp").click(function(e) {
        var mobile = jQuery("#forgotmob").val();
		var url = jQuery(".forgot-otp-url").val();
		
		jQuery(".blankerror").css('display','none');
		if(isBlank(mobile)== false){
			jQuery(".blankerror").css('display','block');
			return false;
		}
		var validate = validateMobile(mobile);
		jQuery(".forgotBlankMobileerror").css('display','none');
		if(validate != true){
			jQuery(".forgotBlankMobileerror").css('display','block');	
			return false;
		}
		
		jQuery(".forgotmobileerror").css('display','none');
		jQuery(".forgotsendotp").css('display','none'); 
		jQuery("#forgot-sms-please-wait").css('display','block'); 		
		
		jQuery.ajax({
		   url: url,
		   type:'GET',
		   data:{mobile:mobile},
		   success: function(data) {
			jQuery("#forgot-sms-please-wait").css('display','none');			   
			  if(data == 'true'){
				   jQuery(".forgotmobileget").css('display','none');
				   jQuery(".forgototpverify").css('display','block');	
				   jQuery(".forgotsendotp").css('display','block');			   
			   }
			   else{
				  jQuery(".forgotmobileerror").css('display','block'); 
				   jQuery(".forgotsendotp").css('display','block');				  
			   }
		   },
		    error: function() {
			jQuery("#forgot-sms-please-wait").css('display','none');				
		   }
		});
    });
	jQuery(".forgotverifyotp").click(function(e) {
        var mobile = jQuery("#forgotmob").val();
		var url = jQuery(".forgotcheckotpurl").val();
		var forgototp = jQuery("#forgototp").val();
		var myaccountlink = jQuery(".forgotAccountlink").val();
		
		jQuery(".blankerror").css('display','none');
		if(isBlank(forgototp)== false){
			jQuery(".blankerror").css('display','block');
			return false;
		}
		jQuery(".forgotverifyotp").css('display','none');	
		jQuery("#forgot-sms-verify-please-wait").css('display','block');			
			
			jQuery.ajax({
			   url: url,
			   type:'GET',
			   data:{mobile:mobile,otp:forgototp},
			   success: function(data) {
				jQuery(".forgotverifyotp").css('display','block');
				jQuery("#forgot-sms-verify-please-wait").css('display','none');				
				if(data == 'true'){
					  jQuery(".forgotmobileget").css('display','none');
					  jQuery(".forgototpverify").css('display','none');
					  jQuery(".setnewpass").css('display','block');		
					  		   
				  }else{
					  jQuery(".checkforgototperror").css('display','block'); 
				   }
			   },
				error: function() {
				jQuery(".forgotverifyotp").css('display','block');				  
				jQuery("#forgot-sms-verify-please-wait").css('display','none');				
			   }
		  
			});
    });
	jQuery(".updatepassbtn").click(function(e) {
		var mobile = jQuery("#forgotmob").val();
		var url = jQuery(".updatepassotp").val();
		var forgototp = jQuery("#forgototp").val();
		var newpassotp = jQuery("#newpassotp").val();
		var newpassconrmotp = jQuery("#newpassconrmotp").val();	
		var accountlinkotp = jQuery(".accountlinkotp").val();
		jQuery(".blankerror").css('display','none');
		jQuery(".resetpassvalidation").css('display','none');		
		
		if(isBlank(newpassotp) == false || isBlank(newpassconrmotp) == false ){
			jQuery(".blankerror").css('display','block');
			return false;
		}
		if(forgotPassValidation(newpassotp,newpassconrmotp) == false){
			jQuery(".resetpassvalidation").css('display','block');
			return false;
		}
		
		jQuery(".passmatcherror").css('display','none');
		jQuery(".updatepassbtn").css('display','none');	
		jQuery("#set-new-pass-please-wait").css('display','block');		
		if(newpassotp == newpassconrmotp){
			jQuery.ajax({
				   url: url,
				   type:'GET',
				   data:{mobile:mobile,otp:forgototp,newpass:newpassotp,confirmpass:newpassconrmotp},
				   success: function(data) {
					jQuery(".updatepassbtn").css('display','block');	
					jQuery("#set-new-pass-please-wait").css('display','none');							
					if(data == 'true'){
						jQuery(".ajax-forgot-form").css('display','none');
						jQuery(".ajax-register-form").css('display','none');
						jQuery(".ajax-login-form").css('display','block');	 
					    jQuery(".updatepasssuccess").css('display','block');						   	
					 }else{
						jQuery(".forgotmobileerror").css('display','block'); 
					   }
				   },
					error: function() {
						jQuery(".updatepassbtn").css('display','block');	
						jQuery("#set-new-pass-please-wait").css('display','none');								
				   }
				});	
		}
		else{
			jQuery(".passmatcherror").css('display','block');
			jQuery(".updatepassbtn").css('display','block');	
			jQuery("#set-new-pass-please-wait").css('display','none');		
		}
    });
	jQuery(".loginotpmobbtn").click(function(e) {
        var mobile = jQuery("#loginotpmob").val();
		var validate = validateMobile(mobile);
		jQuery(".loginotpmobbtnerror").css('display','none');
		jQuery(".loginsendotperror").css('display','none'); 	
		if(validate != true){
			jQuery(".loginotpmobbtnerror").css('display','block');	
			return false;
		}
		var url = jQuery(".loginotp-otp-url").val();
		jQuery("#login-sms-please-wait").css('display','block');		
		jQuery(".loginotpmobbtn").css('display','none');
		jQuery(".updatepasssuccess").css('display','none');	
		
		jQuery.ajax({
			 url: url,
			 type:'GET',
			 data:{mobile:mobile},
			 success: function(data) {
				 if(data == 'true'){
					jQuery(".loginotpmobileget").css('display','none');
					jQuery(".loginotpverify").css('display','block');
					jQuery("#login-sms-please-wait").css('display','none');	
					jQuery(".loginotpmobbtn").css('display','block');
				 }
				 else{
					jQuery(".loginsendotperror").css('display','block'); 
					jQuery("#login-sms-please-wait").css('display','none');	
					jQuery(".loginotpmobbtn").css('display','block');;	
				 }
			 },
			  error: function() {
			 }
			});	
   	 });
	 jQuery(".loginverifyotp").click(function(e) {
        var mobile = jQuery("#loginotpmob").val();
		var otp = jQuery("#logintotp").val();
		var url = jQuery(".loginotp-verify-url").val();
		var urlaccount = jQuery(".customeraccount").val();
		jQuery("#login-verify-please-wait").css('display','block'); 
		jQuery(".checkloginotperror").css('display','none');
		jQuery(".loginverifyotp").css('display','none');
		jQuery.ajax({
			 url: url,
			 type:'GET',
			 data:{mobile:mobile,otp:otp},
			 success: function(data) {
				if(data == 'true'){
					window.location.href = urlaccount;
				}
				else{
					jQuery("#login-verify-please-wait").css('display','none'); 
					jQuery(".checkloginotperror").css('display','block'); 
					jQuery(".loginverifyotp").css('display','block');
				 }
			 },
			  error: function() {
				jQuery(".loginverifyotp").css('display','block');				  
	 			jQuery("#login-verify-please-wait").css('display','none'); 	
				jQuery(".checkloginotperror").css('display','block'); 			 				  
			 }
			});	
    });
	function forgotPassValidation(pass,passconfirm)
	{
	     if(pass.length < 6 || passconfirm.length < 6){
              return false;
           }
            
	}
	function validateMobile(mobile){
		
            var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

            if (filter.test(mobile)) {
              if(mobile.length >= 10 && mobile.length <= 13){
                   var validate = true;
              } else {
                  var validate = false;
              }
            }
            else {
				  var validate = false;
            }
         return validate;
	}
	function isBlank(value){
		if(!value)
		{
			return false;
		}
	}
	jQuery(".mobnumber").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if (jQuery.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) 					        {
            e.preventDefault();
        }
    });
});
function doRegister()
{	
	jQuery(".ajax-register-form").css('display','block');
	jQuery(".ajax-forgot-form").css('display','none');	  
	jQuery(".ajax-login-form").css('display','none');
}

function doLogin()
{
	jQuery(".ajax-forgot-form").css('display','none');	  
	jQuery(".ajax-register-form").css('display','none');
	jQuery(".ajax-login-form").css('display','block');	
}