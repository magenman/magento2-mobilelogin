<?php
namespace Magenman\Mobilelogin\Block\Account\Dashboard;
use Magento\Framework\App\Config\ScopeConfigInterface;
class Updatemobile extends \Magento\Config\Block\System\Config\Form\Field
{
     const CALLBACK_TEMPLATE = 'updateMobile.phtml';
 
    protected function _prepareLayout()
    {
        parent::_prepareLayout();
        if (!$this->getTemplate()) {
            $this->setTemplate(static::CALLBACK_TEMPLATE);
        }
        return $this;
    }
    protected function _getElementHtml(\Magento\Framework\Data\Form\Element\AbstractElement $element)
    {
        return $this->_toHtml();
    }
}