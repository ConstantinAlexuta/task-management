BEGIN
    DECLARE
        c INT;

    BEGIN
        SELECT COUNT(*) INTO c FROM USER_TABLES WHERE TABLE_NAME = UPPER('TBL_TASK');
        IF c = 1 THEN
            EXECUTE IMMEDIATE 'DROP TABLE C##_TASK_MANAGEMENT.TBL_TASK CASCADE CONSTRAINTS';
        END IF;
    END;

    EXECUTE IMMEDIATE 'CREATE TABLE C##_TASK_MANAGEMENT.TBL_TASK (
        N_TASK_ID                    NUMBER(8,0)             NOT NULL,
        VCH_DESCRIPTION              VARCHAR2(50 BYTE)       NOT NULL,
        VCH_STATUS                   VARCHAR2(50 BYTE)       NOT NULL,
        PRIMARY KEY (N_TASK_ID)
    )';

END;