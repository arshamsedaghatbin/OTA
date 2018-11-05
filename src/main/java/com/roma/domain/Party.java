package com.roma.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.roma.domain.enumeration.PartyType;

/**
 * A Party.
 */
@Entity
@Table(name = "party")
public class Party implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uuid")
    private String uuid;

    @Enumerated(EnumType.STRING)
    @Column(name = "perty_type")
    private PartyType pertyType;

    @OneToOne    @JoinColumn(unique = true)
    private PartyRelation relation;

    @OneToMany(mappedBy = "party")
    private Set<Address> adsresses = new HashSet<>();
    @OneToMany(mappedBy = "party")
    private Set<FlightTicket> flighttickets = new HashSet<>();
    @OneToMany(mappedBy = "party")
    private Set<Document> documents = new HashSet<>();
    @OneToMany(mappedBy = "party")
    private Set<Acount> acounts = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public Party uuid(String uuid) {
        this.uuid = uuid;
        return this;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public PartyType getPertyType() {
        return pertyType;
    }

    public Party pertyType(PartyType pertyType) {
        this.pertyType = pertyType;
        return this;
    }

    public void setPertyType(PartyType pertyType) {
        this.pertyType = pertyType;
    }

    public PartyRelation getRelation() {
        return relation;
    }

    public Party relation(PartyRelation partyRelation) {
        this.relation = partyRelation;
        return this;
    }

    public void setRelation(PartyRelation partyRelation) {
        this.relation = partyRelation;
    }

    public Set<Address> getAdsresses() {
        return adsresses;
    }

    public Party adsresses(Set<Address> addresses) {
        this.adsresses = addresses;
        return this;
    }

    public Party addAdsress(Address address) {
        this.adsresses.add(address);
        address.setParty(this);
        return this;
    }

    public Party removeAdsress(Address address) {
        this.adsresses.remove(address);
        address.setParty(null);
        return this;
    }

    public void setAdsresses(Set<Address> addresses) {
        this.adsresses = addresses;
    }

    public Set<FlightTicket> getFlighttickets() {
        return flighttickets;
    }

    public Party flighttickets(Set<FlightTicket> flightTickets) {
        this.flighttickets = flightTickets;
        return this;
    }

    public Party addFlightticket(FlightTicket flightTicket) {
        this.flighttickets.add(flightTicket);
        flightTicket.setParty(this);
        return this;
    }

    public Party removeFlightticket(FlightTicket flightTicket) {
        this.flighttickets.remove(flightTicket);
        flightTicket.setParty(null);
        return this;
    }

    public void setFlighttickets(Set<FlightTicket> flightTickets) {
        this.flighttickets = flightTickets;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public Party documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public Party addDocument(Document document) {
        this.documents.add(document);
        document.setParty(this);
        return this;
    }

    public Party removeDocument(Document document) {
        this.documents.remove(document);
        document.setParty(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Set<Acount> getAcounts() {
        return acounts;
    }

    public Party acounts(Set<Acount> acounts) {
        this.acounts = acounts;
        return this;
    }

    public Party addAcount(Acount acount) {
        this.acounts.add(acount);
        acount.setParty(this);
        return this;
    }

    public Party removeAcount(Acount acount) {
        this.acounts.remove(acount);
        acount.setParty(null);
        return this;
    }

    public void setAcounts(Set<Acount> acounts) {
        this.acounts = acounts;
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
        Party party = (Party) o;
        if (party.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), party.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Party{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", pertyType='" + getPertyType() + "'" +
            "}";
    }
}
