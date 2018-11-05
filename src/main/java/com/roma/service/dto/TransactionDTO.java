package com.roma.service.dto;

import java.time.ZonedDateTime;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the Transaction entity.
 */
public class TransactionDTO implements Serializable {

    private Long id;

    private ZonedDateTime transactiondate;

    private String transactionNumber;

    private BigDecimal transactionAmount;

    private Long acountId;

    private Long transactionRelationId;

    private Long transactionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTransactiondate() {
        return transactiondate;
    }

    public void setTransactiondate(ZonedDateTime transactiondate) {
        this.transactiondate = transactiondate;
    }

    public String getTransactionNumber() {
        return transactionNumber;
    }

    public void setTransactionNumber(String transactionNumber) {
        this.transactionNumber = transactionNumber;
    }

    public BigDecimal getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(BigDecimal transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public Long getAcountId() {
        return acountId;
    }

    public void setAcountId(Long acountId) {
        this.acountId = acountId;
    }

    public Long getTransactionRelationId() {
        return transactionRelationId;
    }

    public void setTransactionRelationId(Long transactionRelationId) {
        this.transactionRelationId = transactionRelationId;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long acountId) {
        this.transactionId = acountId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TransactionDTO transactionDTO = (TransactionDTO) o;
        if (transactionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transactionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransactionDTO{" +
            "id=" + getId() +
            ", transactiondate='" + getTransactiondate() + "'" +
            ", transactionNumber='" + getTransactionNumber() + "'" +
            ", transactionAmount=" + getTransactionAmount() +
            ", acount=" + getAcountId() +
            ", transactionRelation=" + getTransactionRelationId() +
            ", transaction=" + getTransactionId() +
            "}";
    }
}
