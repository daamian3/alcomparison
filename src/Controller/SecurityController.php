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
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Translation\TranslatorInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/register", name="register")
     * @Method({"POST"})
     */
    public function register(){
        $user = new Users();
        $form = $this->createForm(UsersType::class, $user);

        return $this->render('register.html.twig', array(
            'form' => $form -> createView(),
        ));
    }

    /**
     * @Route("/confirm/{username}&{token}", name="confirm")
     */
    public function confirm($username, $token){
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

    /**
     * @Route("/login", name="login")
     */
    public function login(Request $request, AuthenticationUtils $authenticationUtils, TranslatorInterface $translator){
        $error = $authenticationUtils -> getLastAuthenticationError();

        if($error){
            $error = $translator -> trans($error -> getMessageKey());
            $this -> addFlash('warning', $error);
        }

        return $this->redirect('/register');
    }

    /**
     * @Route("/login_external", name="login_external")
     * @Method({"POST"})
     */
    public function login_external(Request $request){
        return $this->render('login.html.twig');
    }
}

