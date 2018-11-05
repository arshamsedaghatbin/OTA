package com.roma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.roma.domain.enumeration.AddresType;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "addres_type")
    private AddresType addresType;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("adsresses")
    private Party party;




    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AddresType getAddresType() {
        return addresType;
    }

    public Address addresType(AddresType addresType) {
        this.addresType = addresType;
        return this;
    }

    public void setAddresType(AddresType addresType) {
        this.addresType = addresType;
    }

    public String getDescription() {
        return description;
    }

    public Address description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }




    public Party getParty() {
        return party;
    }

    public Address party(Party party) {
        this.party = party;
        return this;
    }

    public void setParty(Party party) {
        this.party = party;
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
        Address address = (Address) o;
        if (address.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), address.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", addresType='" + getAddresType() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
