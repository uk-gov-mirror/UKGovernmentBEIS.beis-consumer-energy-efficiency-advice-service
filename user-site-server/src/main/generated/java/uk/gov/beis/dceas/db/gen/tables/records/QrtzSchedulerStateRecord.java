/*
 * This file is generated by jOOQ.
*/
package uk.gov.beis.dceas.db.gen.tables.records;


import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record2;
import org.jooq.Record4;
import org.jooq.Row4;
import org.jooq.impl.UpdatableRecordImpl;

import uk.gov.beis.dceas.db.gen.tables.QrtzSchedulerState;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.9.6"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class QrtzSchedulerStateRecord extends UpdatableRecordImpl<QrtzSchedulerStateRecord> implements Record4<String, String, Long, Long> {

    private static final long serialVersionUID = -886482767;

    /**
     * Setter for <code>qrtz_scheduler_state.sched_name</code>.
     */
    public QrtzSchedulerStateRecord setSchedName(String value) {
        set(0, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_scheduler_state.sched_name</code>.
     */
    public String getSchedName() {
        return (String) get(0);
    }

    /**
     * Setter for <code>qrtz_scheduler_state.instance_name</code>.
     */
    public QrtzSchedulerStateRecord setInstanceName(String value) {
        set(1, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_scheduler_state.instance_name</code>.
     */
    public String getInstanceName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>qrtz_scheduler_state.last_checkin_time</code>.
     */
    public QrtzSchedulerStateRecord setLastCheckinTime(Long value) {
        set(2, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_scheduler_state.last_checkin_time</code>.
     */
    public Long getLastCheckinTime() {
        return (Long) get(2);
    }

    /**
     * Setter for <code>qrtz_scheduler_state.checkin_interval</code>.
     */
    public QrtzSchedulerStateRecord setCheckinInterval(Long value) {
        set(3, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_scheduler_state.checkin_interval</code>.
     */
    public Long getCheckinInterval() {
        return (Long) get(3);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record2<String, String> key() {
        return (Record2) super.key();
    }

    // -------------------------------------------------------------------------
    // Record4 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row4<String, String, Long, Long> fieldsRow() {
        return (Row4) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row4<String, String, Long, Long> valuesRow() {
        return (Row4) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field1() {
        return QrtzSchedulerState.QRTZ_SCHEDULER_STATE.SCHED_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return QrtzSchedulerState.QRTZ_SCHEDULER_STATE.INSTANCE_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field3() {
        return QrtzSchedulerState.QRTZ_SCHEDULER_STATE.LAST_CHECKIN_TIME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field4() {
        return QrtzSchedulerState.QRTZ_SCHEDULER_STATE.CHECKIN_INTERVAL;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value1() {
        return getSchedName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getInstanceName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value3() {
        return getLastCheckinTime();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value4() {
        return getCheckinInterval();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzSchedulerStateRecord value1(String value) {
        setSchedName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzSchedulerStateRecord value2(String value) {
        setInstanceName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzSchedulerStateRecord value3(Long value) {
        setLastCheckinTime(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzSchedulerStateRecord value4(Long value) {
        setCheckinInterval(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzSchedulerStateRecord values(String value1, String value2, Long value3, Long value4) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached QrtzSchedulerStateRecord
     */
    public QrtzSchedulerStateRecord() {
        super(QrtzSchedulerState.QRTZ_SCHEDULER_STATE);
    }

    /**
     * Create a detached, initialised QrtzSchedulerStateRecord
     */
    public QrtzSchedulerStateRecord(String schedName, String instanceName, Long lastCheckinTime, Long checkinInterval) {
        super(QrtzSchedulerState.QRTZ_SCHEDULER_STATE);

        set(0, schedName);
        set(1, instanceName);
        set(2, lastCheckinTime);
        set(3, checkinInterval);
    }
}
