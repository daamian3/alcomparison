<?php
/**
 * Created by PhpStorm.
 * User: Damian
 * Date: 14.04.2018
 * Time: 12:08
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;

class MainController extends Controller
{
    /**
     * @Route("/start", name="start")
     */
    public function indexAction(UserInterface $user = null){
        //if(!$user){
        //    $this -> addFlash('notice', 'Aby skorzystać z serwisu, proszę się zalogować.');
        //    return $this -> redirectToRoute('homepage');
        // }
        return $this->render('start.html.twig');
    }
}