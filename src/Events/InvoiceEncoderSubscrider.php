<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class InvoiceEncoderSubscrider implements EventSubscriberInterface
{
    /** @var Security */
    private $security;

    /** @var InvoiceRepository */
    private $repository;

    public function __construct(Security $security, InvoiceRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }


    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [['setChronoForInvoice', EventPriorities::PRE_VALIDATE], ['setDateInvoice', EventPriorities::PRE_VALIDATE]]
        ];
    }

    public function setChronoForInvoice(ViewEvent $event)
    {
        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($invoice instanceof Invoice && $method === "POST") {
            $chrono = $this->repository->findNextChrono($this->security->getUser());
            $invoice->setChrono( $chrono);
        }
    }

    public function setDateInvoice(ViewEvent $event)
    {
        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($invoice instanceof Invoice && $method === "POST") {

            $invoice->setSendAt(new \Datetime('now'));
        }
    }
}
