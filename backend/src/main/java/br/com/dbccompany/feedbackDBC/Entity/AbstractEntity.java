package br.com.dbccompany.feedbackDBC.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

public abstract	class AbstractEntity {
    public abstract Integer getId();
    public abstract void setId(Integer id);
}
