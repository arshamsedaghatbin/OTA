package com.roma.repository;

import com.roma.domain.TransactionRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransactionRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionRelationRepository extends JpaRepository<TransactionRelation, Long> {

}
