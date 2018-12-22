<?php
 
namespace Mageman\Mobilelogin\Controller\Index;
 
use Magento\Framework\App\Action\Context;
use Magento\Customer\Model\Account\Redirect as AccountRedirect;
use Magento\Customer\Model\Session;


class SentOtpByReg extends \Magento\Framework\App\Action\Action
{
    protected $_resultPageFactory;
	protected $jsonResultFactory;
	protected $session;
	protected $formKeyValidator;
	public $_storeManager;
	public $_helperdata;
    
	public function __construct(
		Context $context,
		\Magento\Framework\View\Result\PageFactory $resultPageFactory,
		\Magento\Framework\Controller\Result\JsonFactory $jsonResultFactory,
		Session $customerSession,
		AccountRedirect $accountRedirect,
		\Magento\Store\Model\StoreManagerInterface $storeManager,
		\Mageman\Mobilelogin\Helper\Data $helperData
		)
    {
        $this->_resultPageFactory = $resultPageFactory;
		$this->jsonResultFactory = $jsonResultFactory;
		$this->session = $customerSession;
		$this->accountRedirect = $accountRedirect;
		$this->_storeManager=$storeManager;

		$this->_helperdata = $helperData;
        parent::__construct($context);
    }
    public function execute()
    {
		$data = $this->getRequest()->getParams();
		$returnVal = $this->_helperdata->sendOTPCode($data['mobile']);
		echo $returnVal;
    }
}