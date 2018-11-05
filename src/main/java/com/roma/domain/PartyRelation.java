package com.roma.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.roma.domain.enumeration.PartyRelationType;

/**
 * A PartyRelation.
 */
@Entity
@Table(name = "party_relation")
public class PartyRelation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "party_relation")
    private PartyRelationType partyRelation;

    @OneToOne    @JoinColumn(unique = true)
    private Party fromParty;

    @OneToOne    @JoinColumn(unique = true)
    private Party toParty;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PartyRelationType getPartyRelation() {
        return partyRelation;
    }

    public PartyRelation partyRelation(PartyRelationType partyRelation) {
        this.partyRelation = partyRelation;
        return this;
    }

    public void setPartyRelation(PartyRelationType partyRelation) {
        this.partyRelation = partyRelation;
    }

    public Party getFromParty() {
        return fromParty;
    }

    public PartyRelation fromParty(Party party) {
        this.fromParty = party;
        return this;
    }

    public void setFromParty(Party party) {
        this.fromParty = party;
    }

    public Party getToParty() {
        return toParty;
    }

    public PartyRelation toParty(Party party) {
        this.toParty = party;
        return this;
    }

    public void setToParty(Party party) {
        this.toParty = party;
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
        PartyRelation partyRelation = (PartyRelation) o;
        if (partyRelation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), partyRelation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PartyRelation{" +
            "id=" + getId() +
            ", partyRelation='" + getPartyRelation() + "'" +
            "}";
    }
}
