/*
 * This file is generated by jOOQ.
*/
package uk.gov.beis.dceas.db.gen.tables.records;


import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record4;
import org.jooq.Row4;
import org.jooq.impl.UpdatableRecordImpl;

import uk.gov.beis.dceas.db.gen.tables.WpOptions;


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
public class WpOptionsRecord extends UpdatableRecordImpl<WpOptionsRecord> implements Record4<Long, String, String, String> {

    private static final long serialVersionUID = -994613398;

    /**
     * Setter for <code>wp_options.option_id</code>.
     */
    public WpOptionsRecord setOptionId(Long value) {
        set(0, value);
        return this;
    }

    /**
     * Getter for <code>wp_options.option_id</code>.
     */
    public Long getOptionId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>wp_options.option_name</code>.
     */
    public WpOptionsRecord setOptionName(String value) {
        set(1, value);
        return this;
    }

    /**
     * Getter for <code>wp_options.option_name</code>.
     */
    public String getOptionName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>wp_options.option_value</code>.
     */
    public WpOptionsRecord setOptionValue(String value) {
        set(2, value);
        return this;
    }

    /**
     * Getter for <code>wp_options.option_value</code>.
     */
    public String getOptionValue() {
        return (String) get(2);
    }

    /**
     * Setter for <code>wp_options.autoload</code>.
     */
    public WpOptionsRecord setAutoload(String value) {
        set(3, value);
        return this;
    }

    /**
     * Getter for <code>wp_options.autoload</code>.
     */
    public String getAutoload() {
        return (String) get(3);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record1<Long> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record4 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row4<Long, String, String, String> fieldsRow() {
        return (Row4) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row4<Long, String, String, String> valuesRow() {
        return (Row4) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field1() {
        return WpOptions.WP_OPTIONS.OPTION_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return WpOptions.WP_OPTIONS.OPTION_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return WpOptions.WP_OPTIONS.OPTION_VALUE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field4() {
        return WpOptions.WP_OPTIONS.AUTOLOAD;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value1() {
        return getOptionId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getOptionName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value3() {
        return getOptionValue();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value4() {
        return getAutoload();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public WpOptionsRecord value1(Long value) {
        setOptionId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public WpOptionsRecord value2(String value) {
        setOptionName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public WpOptionsRecord value3(String value) {
        setOptionValue(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public WpOptionsRecord value4(String value) {
        setAutoload(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public WpOptionsRecord values(Long value1, String value2, String value3, String value4) {
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
     * Create a detached WpOptionsRecord
     */
    public WpOptionsRecord() {
        super(WpOptions.WP_OPTIONS);
    }

    /**
     * Create a detached, initialised WpOptionsRecord
     */
    public WpOptionsRecord(Long optionId, String optionName, String optionValue, String autoload) {
        super(WpOptions.WP_OPTIONS);

        set(0, optionId);
        set(1, optionName);
        set(2, optionValue);
        set(3, autoload);
    }
}
