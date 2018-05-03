<?php

namespace App\Form;

use App\Entity\Users;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;

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
                    'maxlenth' => '.{254}',
                ),
                'label' => false,
            ))
            ->add('username', TextType::class, array(
                'attr' => array(
                    'class' => 'register__username',
                    'placeholder' => 'Nazwa użytkownika',
                    'title' => 'Od 3 do 30 znaków',
                    'aria-label' => 'username',
                    'pattern' => '.{3,30}',
                ),
                'label' => false,
            ))
            ->add('password', RepeatedType::class, array(
                'type' => PasswordType::class,
                'first_options'  => array(
                    'label' => false,
                    'attr' => array(
                        'placeholder' => 'Hasło',
                        'aria-label' => 'password',
                        'title' => 'Minimum 8 znaków',
                        'class' => 'register__password',
                        'pattern' => '.{8,}'),
                ),
                'second_options' => array(
                    'label' => false,
                    'attr' => array(
                        'placeholder' => 'Powtórz hasło',
                        'title' => 'Minimum 8 znaków',
                        'aria-label' => 'password_again',
                        'class' => 'register__password-check',
                        'pattern' => '.{8,}'),
                ),
                'label' => false,
            ))
            ->add('terms', CheckboxType::class, array(
                'mapped' => false,
                'constraints' => new IsTrue(),
                'label' => 'Akceptuję regulamin',
                'label_attr' => array(
                    'class' => 'register__terms-label',
                    'id' => 'acceptTerms',
                ),
                'attr' => array('class' => 'register__terms-input'),
            ))
            ->add('submit', SubmitType::class, array(
                'attr' => array(
                    'class' => 'register__submit'),
                'label' => 'Zarejestruj się',
            ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Users::class,
            'csrf_protection' => true,
            'csrf_field_name' => '_token',
            'csrf_token_id'   => 'task_item',
        ]);
    }
}
