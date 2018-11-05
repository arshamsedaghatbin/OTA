package com.roma.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.roma.domain.enumeration.AddresType;

/**
 * A DTO for the Address entity.
 */
public class AddressDTO implements Serializable {

    private Long id;

    private AddresType addresType;

    private String description;

    private Long partyId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AddresType getAddresType() {
        return addresType;
    }

    public void setAddresType(AddresType addresType) {
        this.addresType = addresType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Long getPartyId() {
        return partyId;
    }

    public void setPartyId(Long partyId) {
        this.partyId = partyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AddressDTO addressDTO = (AddressDTO) o;
        if (addressDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), addressDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AddressDTO{" +
            "id=" + getId() +
            ", addresType='" + getAddresType() + "'" +
            ", description='" + getDescription() + "'" +
            ", party=" + getPartyId() +
            ", party=" + getPartyId() +
            "}";
    }
}
