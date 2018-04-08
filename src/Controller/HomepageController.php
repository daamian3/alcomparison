<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class HomepageController extends Controller
{

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(){
        return $this -> render('homepage.html.twig', array(
            'number' => mt_rand(0, 1000),
        ));
    }
}