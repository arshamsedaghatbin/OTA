package com.roma.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.roma.domain.enumeration.AcountType;

/**
 * A Acount.
 */
@Entity
@Table(name = "acount")
public class Acount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "acount_number", nullable = false)
    private String acountNumber;

    @Column(name = "balance", precision = 10, scale = 2)
    private BigDecimal balance;

    @Enumerated(EnumType.STRING)
    @Column(name = "acount_type")
    private AcountType acountType;

    @ManyToOne
    @JsonIgnoreProperties("acounts")
    private Party party;

    @OneToMany(mappedBy = "acount")
    private Set<Transaction> transactions = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("")
    private Party adsress;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAcountNumber() {
        return acountNumber;
    }

    public Acount acountNumber(String acountNumber) {
        this.acountNumber = acountNumber;
        return this;
    }

    public void setAcountNumber(String acountNumber) {
        this.acountNumber = acountNumber;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public Acount balance(BigDecimal balance) {
        this.balance = balance;
        return this;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public AcountType getAcountType() {
        return acountType;
    }

    public Acount acountType(AcountType acountType) {
        this.acountType = acountType;
        return this;
    }

    public void setAcountType(AcountType acountType) {
        this.acountType = acountType;
    }

    public Party getParty() {
        return party;
    }

    public Acount party(Party party) {
        this.party = party;
        return this;
    }

    public void setParty(Party party) {
        this.party = party;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public Acount transactions(Set<Transaction> transactions) {
        this.transactions = transactions;
        return this;
    }

    public Acount addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.setAcount(this);
        return this;
    }

    public Acount removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.setAcount(null);
        return this;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }

    public Party getAdsress() {
        return adsress;
    }

    public Acount adsress(Party party) {
        this.adsress = party;
        return this;
    }

    public void setAdsress(Party party) {
        this.adsress = party;
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
        Acount acount = (Acount) o;
        if (acount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), acount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Acount{" +
            "id=" + getId() +
            ", acountNumber='" + getAcountNumber() + "'" +
            ", balance=" + getBalance() +
            ", acountType='" + getAcountType() + "'" +
            "}";
    }
}
