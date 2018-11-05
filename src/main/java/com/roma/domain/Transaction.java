package com.roma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * Task entity.
 * @author The JHipster team.
 */
@ApiModel(description = "Task entity. @author The JHipster team.")
@Entity
@Table(name = "transaction")
public class Transaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transactiondate")
    private ZonedDateTime transactiondate;

    @Column(name = "transaction_number")
    private String transactionNumber;

    @Column(name = "transaction_amount", precision = 10, scale = 2)
    private BigDecimal transactionAmount;

    @ManyToOne
    @JsonIgnoreProperties("transactions")
    private Acount acount;

    @OneToOne    @JoinColumn(unique = true)
    private TransactionRelation transactionRelation;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Acount transaction;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTransactiondate() {
        return transactiondate;
    }

    public Transaction transactiondate(ZonedDateTime transactiondate) {
        this.transactiondate = transactiondate;
        return this;
    }

    public void setTransactiondate(ZonedDateTime transactiondate) {
        this.transactiondate = transactiondate;
    }

    public String getTransactionNumber() {
        return transactionNumber;
    }

    public Transaction transactionNumber(String transactionNumber) {
        this.transactionNumber = transactionNumber;
        return this;
    }

    public void setTransactionNumber(String transactionNumber) {
        this.transactionNumber = transactionNumber;
    }

    public BigDecimal getTransactionAmount() {
        return transactionAmount;
    }

    public Transaction transactionAmount(BigDecimal transactionAmount) {
        this.transactionAmount = transactionAmount;
        return this;
    }

    public void setTransactionAmount(BigDecimal transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public Acount getAcount() {
        return acount;
    }

    public Transaction acount(Acount acount) {
        this.acount = acount;
        return this;
    }

    public void setAcount(Acount acount) {
        this.acount = acount;
    }

    public TransactionRelation getTransactionRelation() {
        return transactionRelation;
    }

    public Transaction transactionRelation(TransactionRelation transactionRelation) {
        this.transactionRelation = transactionRelation;
        return this;
    }

    public void setTransactionRelation(TransactionRelation transactionRelation) {
        this.transactionRelation = transactionRelation;
    }

    public Acount getTransaction() {
        return transaction;
    }

    public Transaction transaction(Acount acount) {
        this.transaction = acount;
        return this;
    }

    public void setTransaction(Acount acount) {
        this.transaction = acount;
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
        Transaction transaction = (Transaction) o;
        if (transaction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transaction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Transaction{" +
            "id=" + getId() +
            ", transactiondate='" + getTransactiondate() + "'" +
            ", transactionNumber='" + getTransactionNumber() + "'" +
            ", transactionAmount=" + getTransactionAmount() +
            "}";
    }
}
