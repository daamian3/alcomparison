<?php

namespace App\Form;

use App\Entity\Users;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UsersType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, array(
                'attr' => array(
                    'class' => 'register__email',
                    'placeholder' => 'E-mail',
                    'aria-label' => 'email',
                ),
                'label' => false
            ))
            ->add('username', TextType::class, array(
                'attr' => array(
                    'class' => 'register__username',
                    'placeholder' => 'Nazwa użytkownika',
                    'aria-label' => 'username',
                ),
                'label' => false
            ))
            ->add('password', RepeatedType::class, array(
                'type' => PasswordType::class,
                'first_options'  => array(
                    'label' => false,
                    'attr' => array(
                        'placeholder' => 'Hasło',
                        'aria-label' => 'password',
                        'class' => 'register__password'),
                ),
                'second_options' => array(
                    'label' => false,
                    'attr' => array(
                        'placeholder' => 'Powtórz hasło',
                        'aria-label' => 'password_again',
                        'class' => 'register__password-check '),
                ),
                'label' => false
            ))
            ->add('submit', SubmitType::class, array(
                'attr' => array(
                    'class' => 'register__submit'),
                'label' => 'Zarejestruj się'
            ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Users::class,
        ]);
    }
}
