/*
 * This file is generated by jOOQ.
*/
package uk.gov.beis.dceas.db.gen.tables;


import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.TableImpl;

import uk.gov.beis.dceas.db.gen.DefaultSchema;
import uk.gov.beis.dceas.db.gen.Keys;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzCronTriggersRecord;


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
public class QrtzCronTriggers extends TableImpl<QrtzCronTriggersRecord> {

    private static final long serialVersionUID = 2038025850;

    /**
     * The reference instance of <code>qrtz_cron_triggers</code>
     */
    public static final QrtzCronTriggers QRTZ_CRON_TRIGGERS = new QrtzCronTriggers();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<QrtzCronTriggersRecord> getRecordType() {
        return QrtzCronTriggersRecord.class;
    }

    /**
     * The column <code>qrtz_cron_triggers.sched_name</code>.
     */
    public final TableField<QrtzCronTriggersRecord, String> SCHED_NAME = createField("sched_name", org.jooq.impl.SQLDataType.VARCHAR.length(120).nullable(false), this, "");

    /**
     * The column <code>qrtz_cron_triggers.trigger_name</code>.
     */
    public final TableField<QrtzCronTriggersRecord, String> TRIGGER_NAME = createField("trigger_name", org.jooq.impl.SQLDataType.VARCHAR.length(200).nullable(false), this, "");

    /**
     * The column <code>qrtz_cron_triggers.trigger_group</code>.
     */
    public final TableField<QrtzCronTriggersRecord, String> TRIGGER_GROUP = createField("trigger_group", org.jooq.impl.SQLDataType.VARCHAR.length(200).nullable(false), this, "");

    /**
     * The column <code>qrtz_cron_triggers.cron_expression</code>.
     */
    public final TableField<QrtzCronTriggersRecord, String> CRON_EXPRESSION = createField("cron_expression", org.jooq.impl.SQLDataType.VARCHAR.length(120).nullable(false), this, "");

    /**
     * The column <code>qrtz_cron_triggers.time_zone_id</code>.
     */
    public final TableField<QrtzCronTriggersRecord, String> TIME_ZONE_ID = createField("time_zone_id", org.jooq.impl.SQLDataType.VARCHAR.length(80), this, "");

    /**
     * Create a <code>qrtz_cron_triggers</code> table reference
     */
    public QrtzCronTriggers() {
        this("qrtz_cron_triggers", null);
    }

    /**
     * Create an aliased <code>qrtz_cron_triggers</code> table reference
     */
    public QrtzCronTriggers(String alias) {
        this(alias, QRTZ_CRON_TRIGGERS);
    }

    private QrtzCronTriggers(String alias, Table<QrtzCronTriggersRecord> aliased) {
        this(alias, aliased, null);
    }

    private QrtzCronTriggers(String alias, Table<QrtzCronTriggersRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, "");
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Schema getSchema() {
        return DefaultSchema.DEFAULT_SCHEMA;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<QrtzCronTriggersRecord> getPrimaryKey() {
        return Keys.PK_QRTZ_CRON_TRIGGERS;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<QrtzCronTriggersRecord>> getKeys() {
        return Arrays.<UniqueKey<QrtzCronTriggersRecord>>asList(Keys.PK_QRTZ_CRON_TRIGGERS);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<ForeignKey<QrtzCronTriggersRecord, ?>> getReferences() {
        return Arrays.<ForeignKey<QrtzCronTriggersRecord, ?>>asList(Keys.FK_QRTZ_CRON_TRIGGERS_QRTZ_TRIGGERS);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzCronTriggers as(String alias) {
        return new QrtzCronTriggers(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public QrtzCronTriggers rename(String name) {
        return new QrtzCronTriggers(name, null);
    }
}
