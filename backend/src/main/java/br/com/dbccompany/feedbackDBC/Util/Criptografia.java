package br.com.dbccompany.feedbackDBC.Util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Criptografia {

    public static String criptografarSenha(String senha){
        return new BCryptPasswordEncoder( 6 ).encode( senha );
    }
}
