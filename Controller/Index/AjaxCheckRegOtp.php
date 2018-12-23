<?php
namespace Magenman\Mobilelogin\Controller\Index;

use Magento\Framework\App\Action\Context;
use Magenman\Mobilelogin\Model\RegotpmodelFactory;
use Magento\Framework\Controller\ResultFactory; 



class AjaxCheckRegOtp extends \Magento\Framework\App\Action\Action
{
	protected $_modelRegOtpFactory;
	public function __construct(
		Context $context,
		RegotpmodelFactory $modelRegOtpFactory
	
	){
		$this->_modelRegOtpFactory = $modelRegOtpFactory;
        parent::__construct($context);
    }
	
	 public function execute()
    {
		$mobile = $this->getRequest()->get('mobile');
		$otp = $this->getRequest()->get('otp');
		
		$otpModels = $this->_modelRegOtpFactory->create();		
		$collection = $otpModels->getCollection();
		$collection->addFieldToFilter('mobile', $mobile);
		$collection->addFieldToFilter('random_code', $otp);
		
		if(count($collection) == '1'){
			/* Ajax Return Magento 2  start*/
				$data = "true";
				$resultJson = $this->resultFactory->create(ResultFactory::TYPE_JSON);
				$resultJson->setData($data);
				return $resultJson;
			/* Ajax Return Magento 2 end*/
		}
		else{
			/* Ajax Return Magento 2  start*/
				$data = "false";
				$resultJson = $this->resultFactory->create(ResultFactory::TYPE_JSON);
				$resultJson->setData($data);
				return $resultJson;
			/* Ajax Return Magento 2 end*/
		}
	}
}