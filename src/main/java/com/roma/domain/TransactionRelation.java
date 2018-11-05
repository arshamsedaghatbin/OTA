package com.roma.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TransactionRelation.
 */
@Entity
@Table(name = "transaction_relation")
public class TransactionRelation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne    @JoinColumn(unique = true)
    private Transaction sourceAcount;

    @OneToOne    @JoinColumn(unique = true)
    private Transaction destinationAcount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Transaction getSourceAcount() {
        return sourceAcount;
    }

    public TransactionRelation sourceAcount(Transaction transaction) {
        this.sourceAcount = transaction;
        return this;
    }

    public void setSourceAcount(Transaction transaction) {
        this.sourceAcount = transaction;
    }

    public Transaction getDestinationAcount() {
        return destinationAcount;
    }

    public TransactionRelation destinationAcount(Transaction transaction) {
        this.destinationAcount = transaction;
        return this;
    }

    public void setDestinationAcount(Transaction transaction) {
        this.destinationAcount = transaction;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TransactionRelation transactionRelation = (TransactionRelation) o;
        if (transactionRelation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transactionRelation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransactionRelation{" +
            "id=" + getId() +
            "}";
    }
}
