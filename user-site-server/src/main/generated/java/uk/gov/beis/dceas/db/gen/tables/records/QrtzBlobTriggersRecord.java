/*
 * This file is generated by jOOQ.
*/
package uk.gov.beis.dceas.db.gen.tables.records;


import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record4;
import org.jooq.Row4;
import org.jooq.impl.TableRecordImpl;

import uk.gov.beis.dceas.db.gen.tables.QrtzBlobTriggers;


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
public class QrtzBlobTriggersRecord extends TableRecordImpl<QrtzBlobTriggersRecord> implements Record4<String, String, String, byte[]> {

    private static final long serialVersionUID = -18834908;

    /**
     * Setter for <code>qrtz_blob_triggers.sched_name</code>.
     */
    public QrtzBlobTriggersRecord setSchedName(String value) {
        set(0, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_blob_triggers.sched_name</code>.
     */
    public String getSchedName() {
        return (String) get(0);
    }

    /**
     * Setter for <code>qrtz_blob_triggers.trigger_name</code>.
     */
    public QrtzBlobTriggersRecord setTriggerName(String value) {
        set(1, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_blob_triggers.trigger_name</code>.
     */
    public String getTriggerName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>qrtz_blob_triggers.trigger_group</code>.
     */
    public QrtzBlobTriggersRecord setTriggerGroup(String value) {
        set(2, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_blob_triggers.trigger_group</code>.
     */
    public String getTriggerGroup() {
        return (String) get(2);
    }

    /**
     * Setter for <code>qrtz_blob_triggers.blob_data</code>.
     */
    public QrtzBlobTriggersRecord setBlobData(byte... value) {
        set(3, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_blob_triggers.blob_data</code>.
     */
    public byte[] getBlobData() {
        return (byte[]) get(3);
    }

    // -------------------------------------------------------------------------
    // Record4 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row4<String, String, String, byte[]> fieldsRow() {
        return (Row4) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row4<String, String, String, byte[]> valuesRow() {
        return (Row4) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field1() {
        return QrtzBlobTriggers.QRTZ_BLOB_TRIGGERS.SCHED_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return QrtzBlobTriggers.QRTZ_BLOB_TRIGGERS.TRIGGER_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return QrtzBlobTriggers.QRTZ_BLOB_TRIGGERS.TRIGGER_GROUP;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<byte[]> field4() {
        return QrtzBlobTriggers.QRTZ_BLOB_TRIGGERS.BLOB_DATA;
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
        return getTriggerName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value3() {
        return getTriggerGroup();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public byte[] value4() {
        return getBlobData();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzBlobTriggersRecord value1(String value) {
        setSchedName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzBlobTriggersRecord value2(String value) {
        setTriggerName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzBlobTriggersRecord value3(String value) {
        setTriggerGroup(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzBlobTriggersRecord value4(byte... value) {
        setBlobData(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzBlobTriggersRecord values(String value1, String value2, String value3, byte[] value4) {
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
     * Create a detached QrtzBlobTriggersRecord
     */
    public QrtzBlobTriggersRecord() {
        super(QrtzBlobTriggers.QRTZ_BLOB_TRIGGERS);
    }

    /**
     * Create a detached, initialised QrtzBlobTriggersRecord
     */
    public QrtzBlobTriggersRecord(String schedName, String triggerName, String triggerGroup, byte[] blobData) {
        super(QrtzBlobTriggers.QRTZ_BLOB_TRIGGERS);

        set(0, schedName);
        set(1, triggerName);
        set(2, triggerGroup);
        set(3, blobData);
    }
}
