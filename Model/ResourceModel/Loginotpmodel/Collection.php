<?php
namespace Magenman\Mobilelogin\Model\ResourceModel\Loginotpmodel;

/**
 * Class Collection
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class Collection extends \Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection
{
    /**
     * @var string
     */
    protected $_idFieldName = 'id';
    
    /**
     * Define main table
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init('Magenman\Mobilelogin\Model\Loginotpmodel', 'Magenman\Mobilelogin\Model\ResourceModel\Loginotpmodel');
    }

    
}
