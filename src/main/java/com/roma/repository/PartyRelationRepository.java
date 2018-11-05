package com.roma.repository;

import com.roma.domain.PartyRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PartyRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PartyRelationRepository extends JpaRepository<PartyRelation, Long> {

}
