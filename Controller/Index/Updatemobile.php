<?php
namespace Mageman\Mobilelogin\Controller\Index;
 
use Magento\Framework\App\Action\Context;
class Updatemobile extends \Magento\Framework\App\Action\Action
{
    protected $_resultPageFactory;
 
    public function __construct(Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory)
    {
        $this->_resultPageFactory = $resultPageFactory;
        parent::__construct($context);
    }
    public function execute()
    {
        $resultPage = $this->_resultPageFactory->create();
		$resultPage->getConfig()->getTitle()->set(__('Mobile Number Update'));
        return $resultPage;
    }
}