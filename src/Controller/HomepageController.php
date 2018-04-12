<?php

namespace App\Controller;

use App\Entity\Users;
use App\Form\UsersType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class HomepageController extends AbstractController
{
//TODO barek parralax i butelki na półkach do wyboruv

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request, UserPasswordEncoderInterface $passwordEncoder, \Swift_Mailer $mailer){

        $user = new Users();
        $form = $this -> createForm(UsersType::class, $user);
        $form -> handleRequest($request);

        if ($form -> isSubmitted() && $form -> isValid()) {

            $currentUsername = $user -> getUsername();

            $is_email_duplicate = $this -> getDoctrine()
                ->getRepository(Users::class)
                ->findOneBy(array('username' => $currentUsername));

            if ($is_email_duplicate){
                $this -> addFlash('warning', 'Ta nazwa użytkownika jest już zajęta!');
            }

            $currentEmail = $user -> getEmail();

            $is_username_duplicate = $this -> getDoctrine()
                ->getRepository(Users::class)
                ->findOneBy(array('email' => $currentEmail));

            if ($is_username_duplicate){
                $this -> addFlash('warning', 'Ten adres email jest już zajęty!');
            }

            if ($is_username_duplicate || $is_email_duplicate){
                return $this->redirectToRoute('homepage');
            }

            $password = $passwordEncoder -> encodePassword($user, $user->getPassword());
            $user -> setPassword($password);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            $message = (new \Swift_Message('Witamy w Blogmajster!'))
                ->setFrom('send@gmail.com')
                ->setTo($currentEmail)
                ->setBody(
                    $this->renderView(
                        'emails/registation.html.twig', array(
                            'username' => $currentUsername,
                            'token' => $user -> getToken(),
                        )
                    ),
                    'text/html'
                )
            ;

            $mailer->send($message);
        }

        return $this->render('homepage.html.twig');
    }

    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(){
            $user = new Users();
            $form = $this -> createForm(UsersType::class, $user);

            return $this->render('register.html.twig',
                array('form' => $form->createView())
            );
        }

    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(){
        return $this->render('register.html.twig');
    }
}