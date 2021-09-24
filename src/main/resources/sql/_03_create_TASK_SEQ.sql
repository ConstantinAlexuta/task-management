BEGIN

    DECLARE
        c INT;

    BEGIN
        SELECT COUNT(*) INTO c FROM USER_SEQUENCES WHERE SEQUENCE_NAME = UPPER('TASK_SEQ');
        IF c = 1 THEN
            EXECUTE IMMEDIATE 'DROP SEQUENCE C##_TASK_MANAGEMENT.TASK_SEQ';
        END IF;
    END;

    EXECUTE IMMEDIATE 'CREATE SEQUENCE C##_TASK_MANAGEMENT.TASK_SEQ
        NOMINVALUE
        NOMAXVALUE
        INCREMENT BY 1
        START WITH 1
        CACHE 20
        NOCYCLE
        NOKEEP
        NOSCALE
        ORDER';
END;