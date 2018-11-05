package com.roma.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import com.roma.domain.enumeration.AcountType;

/**
 * A DTO for the Acount entity.
 */
public class AcountDTO implements Serializable {

    private Long id;

    @NotNull
    private String acountNumber;

    private BigDecimal balance;

    private AcountType acountType;

    private Long partyId;

    private Long adsressId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAcountNumber() {
        return acountNumber;
    }

    public void setAcountNumber(String acountNumber) {
        this.acountNumber = acountNumber;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public AcountType getAcountType() {
        return acountType;
    }

    public void setAcountType(AcountType acountType) {
        this.acountType = acountType;
    }

    public Long getPartyId() {
        return partyId;
    }

    public void setPartyId(Long partyId) {
        this.partyId = partyId;
    }

    public Long getAdsressId() {
        return adsressId;
    }

    public void setAdsressId(Long partyId) {
        this.adsressId = partyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AcountDTO acountDTO = (AcountDTO) o;
        if (acountDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), acountDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AcountDTO{" +
            "id=" + getId() +
            ", acountNumber='" + getAcountNumber() + "'" +
            ", balance=" + getBalance() +
            ", acountType='" + getAcountType() + "'" +
            ", party=" + getPartyId() +
            ", adsress=" + getAdsressId() +
            "}";
    }
}
