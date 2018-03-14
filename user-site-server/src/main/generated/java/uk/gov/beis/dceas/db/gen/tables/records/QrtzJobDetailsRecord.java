/*
 * This file is generated by jOOQ.
*/
package uk.gov.beis.dceas.db.gen.tables.records;


import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record10;
import org.jooq.Record3;
import org.jooq.Row10;
import org.jooq.impl.UpdatableRecordImpl;

import uk.gov.beis.dceas.db.gen.tables.QrtzJobDetails;


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
public class QrtzJobDetailsRecord extends UpdatableRecordImpl<QrtzJobDetailsRecord> implements Record10<String, String, String, String, String, Boolean, Boolean, Boolean, Boolean, byte[]> {

    private static final long serialVersionUID = -2051584015;

    /**
     * Setter for <code>qrtz_job_details.sched_name</code>.
     */
    public QrtzJobDetailsRecord setSchedName(String value) {
        set(0, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_job_details.sched_name</code>.
     */
    public String getSchedName() {
        return (String) get(0);
    }

    /**
     * Setter for <code>qrtz_job_details.job_name</code>.
     */
    public QrtzJobDetailsRecord setJobName(String value) {
        set(1, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_job_details.job_name</code>.
     */
    public String getJobName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>qrtz_job_details.job_group</code>.
     */
    public QrtzJobDetailsRecord setJobGroup(String value) {
        set(2, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_job_details.job_group</code>.
     */
    public String getJobGroup() {
        return (String) get(2);
    }

    /**
     * Setter for <code>qrtz_job_details.description</code>.
     */
    public QrtzJobDetailsRecord setDescription(String value) {
        set(3, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_job_details.description</code>.
     */
    public String getDescription() {
        return (String) get(3);
    }

    /**
     * Setter for <code>qrtz_job_details.job_class_name</code>.
     */
    public QrtzJobDetailsRecord setJobClassName(String value) {
        set(4, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_job_details.job_class_name</code>.
     */
    public String getJobClassName() {
        return (String) get(4);
    }

    /**
     * Setter for <code>qrtz_job_details.is_durable</code>.
     */
    public QrtzJobDetailsRecord setIsDurable(Boolean value) {
        set(5, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_job_details.is_durable</code>.
     */
    public Boolean getIsDurable() {
        return (Boolean) get(5);
    }

    /**
     * Setter for <code>qrtz_job_details.is_nonconcurrent</code>.
     */
    public QrtzJobDetailsRecord setIsNonconcurrent(Boolean value) {
        set(6, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_job_details.is_nonconcurrent</code>.
     */
    public Boolean getIsNonconcurrent() {
        return (Boolean) get(6);
    }

    /**
     * Setter for <code>qrtz_job_details.is_update_data</code>.
     */
    public QrtzJobDetailsRecord setIsUpdateData(Boolean value) {
        set(7, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_job_details.is_update_data</code>.
     */
    public Boolean getIsUpdateData() {
        return (Boolean) get(7);
    }

    /**
     * Setter for <code>qrtz_job_details.requests_recovery</code>.
     */
    public QrtzJobDetailsRecord setRequestsRecovery(Boolean value) {
        set(8, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_job_details.requests_recovery</code>.
     */
    public Boolean getRequestsRecovery() {
        return (Boolean) get(8);
    }

    /**
     * Setter for <code>qrtz_job_details.job_data</code>.
     */
    public QrtzJobDetailsRecord setJobData(byte... value) {
        set(9, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_job_details.job_data</code>.
     */
    public byte[] getJobData() {
        return (byte[]) get(9);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record3<String, String, String> key() {
        return (Record3) super.key();
    }

    // -------------------------------------------------------------------------
    // Record10 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row10<String, String, String, String, String, Boolean, Boolean, Boolean, Boolean, byte[]> fieldsRow() {
        return (Row10) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row10<String, String, String, String, String, Boolean, Boolean, Boolean, Boolean, byte[]> valuesRow() {
        return (Row10) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field1() {
        return QrtzJobDetails.QRTZ_JOB_DETAILS.SCHED_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return QrtzJobDetails.QRTZ_JOB_DETAILS.JOB_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return QrtzJobDetails.QRTZ_JOB_DETAILS.JOB_GROUP;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field4() {
        return QrtzJobDetails.QRTZ_JOB_DETAILS.DESCRIPTION;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field5() {
        return QrtzJobDetails.QRTZ_JOB_DETAILS.JOB_CLASS_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Boolean> field6() {
        return QrtzJobDetails.QRTZ_JOB_DETAILS.IS_DURABLE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Boolean> field7() {
        return QrtzJobDetails.QRTZ_JOB_DETAILS.IS_NONCONCURRENT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Boolean> field8() {
        return QrtzJobDetails.QRTZ_JOB_DETAILS.IS_UPDATE_DATA;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Boolean> field9() {
        return QrtzJobDetails.QRTZ_JOB_DETAILS.REQUESTS_RECOVERY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<byte[]> field10() {
        return QrtzJobDetails.QRTZ_JOB_DETAILS.JOB_DATA;
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
        return getJobName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value3() {
        return getJobGroup();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value4() {
        return getDescription();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value5() {
        return getJobClassName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean value6() {
        return getIsDurable();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean value7() {
        return getIsNonconcurrent();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean value8() {
        return getIsUpdateData();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean value9() {
        return getRequestsRecovery();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public byte[] value10() {
        return getJobData();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzJobDetailsRecord value1(String value) {
        setSchedName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzJobDetailsRecord value2(String value) {
        setJobName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzJobDetailsRecord value3(String value) {
        setJobGroup(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzJobDetailsRecord value4(String value) {
        setDescription(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzJobDetailsRecord value5(String value) {
        setJobClassName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzJobDetailsRecord value6(Boolean value) {
        setIsDurable(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzJobDetailsRecord value7(Boolean value) {
        setIsNonconcurrent(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzJobDetailsRecord value8(Boolean value) {
        setIsUpdateData(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzJobDetailsRecord value9(Boolean value) {
        setRequestsRecovery(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzJobDetailsRecord value10(byte... value) {
        setJobData(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzJobDetailsRecord values(String value1, String value2, String value3, String value4, String value5, Boolean value6, Boolean value7, Boolean value8, Boolean value9, byte[] value10) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        value7(value7);
        value8(value8);
        value9(value9);
        value10(value10);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached QrtzJobDetailsRecord
     */
    public QrtzJobDetailsRecord() {
        super(QrtzJobDetails.QRTZ_JOB_DETAILS);
    }

    /**
     * Create a detached, initialised QrtzJobDetailsRecord
     */
    public QrtzJobDetailsRecord(String schedName, String jobName, String jobGroup, String description, String jobClassName, Boolean isDurable, Boolean isNonconcurrent, Boolean isUpdateData, Boolean requestsRecovery, byte[] jobData) {
        super(QrtzJobDetails.QRTZ_JOB_DETAILS);

        set(0, schedName);
        set(1, jobName);
        set(2, jobGroup);
        set(3, description);
        set(4, jobClassName);
        set(5, isDurable);
        set(6, isNonconcurrent);
        set(7, isUpdateData);
        set(8, requestsRecovery);
        set(9, jobData);
    }
}