<?php
/**
 * Created by PhpStorm.
 * User: Damian
 * Date: 02.04.2018
 * Time: 21:12
 */

namespace App\Controller;

use App\Entity\Users;
use App\Form\UsersType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    /**
     * @Route("/confirm/{username}&{token}", name="confirm")
     */
    public function confirm($username, $token)
    {
        $em = $this -> getDoctrine() -> getManager();

        $user = $em -> getRepository(Users::class)
            -> findOneBy(array('username' => $username));

        if($user -> getToken() == $token){
            $user -> setIsActive(true);
            $user -> setToken('');
            $em -> flush();

            $this -> addFlash('success', 'Konto zostało pomyślnie zweryfikowane! Teraz możesz się zalogować:');
        }

        else $this -> addFlash('warning', 'Ups! Coś poszło nie tak, przepraszamy!');

        return $this->redirectToRoute('homepage');
    }
}

