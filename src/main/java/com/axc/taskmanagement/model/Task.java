package com.axc.taskmanagement.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "TBL_TASK", schema = "C##_TASK_MANAGEMENT")
public class Task {

    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TASK_SEQ_GENERATOR")
//    @SequenceGenerator(name = "TASK_SEQ_GENERATOR", sequenceName = "TASK_SEQ",
//            schema = "C##_TASK_MANAGEMENT", initialValue = 1, allocationSize = 1)
    @Column(name = "N_TASK_ID", nullable = false, unique = true, updatable = false)
    private Long id;

    @Column(name = "VCH_DESCRIPTION", nullable = false)
    private String description;

    @Column(name = "VCH_STATUS", nullable = false)
    private String status;

    public Task(String description, String status) {
        this.description = description;
        this.status = status;
    }
}
