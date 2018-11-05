package com.roma.repository;

import com.roma.domain.Acount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Acount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcountRepository extends JpaRepository<Acount, Long> {

}
