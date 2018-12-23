<?php 
namespace Magenman\Mobilelogin\Helper;
use \Magento\Framework\App\Config\ScopeConfigInterface;
use \Magento\Store\Model\StoreManagerInterface;

class Apicall extends \Magento\Framework\App\Helper\AbstractHelper
{
	protected $scopeConfig;
    protected $_storeManager;
	
	
	public function __construct(
		ScopeConfigInterface $scopeConfig,
		StoreManagerInterface $storeManager
		)
	{
		$this->scopeConfig = $scopeConfig;
		$this->_storeManager = $storeManager;
		
	}
	public function isEnable()
	{
		return $this->scopeConfig->getValue(
            'mobilelogin/moduleoption/enable',
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
	}
	
	public function getAuthkey()
	{
	   return $this->scopeConfig->getValue(
            'mobilelogin/general/authkey',
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
	}
	
	public function getRouttype()
	{
		 return $this->scopeConfig->getValue(
            'mobilelogin/general/routtype',
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
	}
	public function getPassword()
	{
		return $this->scopeConfig->getValue(
            'mobilelogin/general/password',
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
	}
	public function getApiUrl()
	{
		return $this->scopeConfig->getValue(
            'mobilelogin/general/apiurl',
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
	}
	public function getSenderId()
	{
		return $this->scopeConfig->getValue(
            'mobilelogin/general/senderid',
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
	}
	
	
	public function curlApiCall($message,$mobilenumbers)
	{
		if($this->isEnable())
		{
				$postData = array(
					'authkey' => $this->getAuthkey(),
					'mobiles' => $mobilenumbers,
					'message' => urlencode($message),
					'sender' => $this->getSenderId(),
					'route' => $this->getRouttype()
				);
				
				$ch = curl_init();
				if (!$ch)
				{
					die("Couldn't initialize a cURL handle");
				}
				
				$ret = curl_setopt($ch, CURLOPT_URL,$this->getApiUrl());
				curl_setopt ($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
				curl_setopt ($ch, CURLOPT_POSTFIELDS,$postData);
				
				$ret = curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				$curlresponse = curl_exec($ch); // execute
				
				if(curl_errno($ch))
					return "error";
				
				if (empty($ret)) 
				{
					die(curl_error($ch));
					curl_close($ch); // close cURL handler
					return "error";
				}
				else
				{
					$info = curl_getinfo($ch);
					curl_close($ch); // close cURL handler
				}
				return "true";		
		}
		else
		{
			return "false";
		}
	}
}