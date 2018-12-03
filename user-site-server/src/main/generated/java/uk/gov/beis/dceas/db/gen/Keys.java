/*
 * This file is generated by jOOQ.
*/
package uk.gov.beis.dceas.db.gen;


import javax.annotation.Generated;

import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.UniqueKey;
import org.jooq.impl.AbstractKeys;

import uk.gov.beis.dceas.db.gen.tables.Boilers;
import uk.gov.beis.dceas.db.gen.tables.Databasechangeloglock;
import uk.gov.beis.dceas.db.gen.tables.Feedback;
import uk.gov.beis.dceas.db.gen.tables.QrtzCalendars;
import uk.gov.beis.dceas.db.gen.tables.QrtzCronTriggers;
import uk.gov.beis.dceas.db.gen.tables.QrtzFiredTriggers;
import uk.gov.beis.dceas.db.gen.tables.QrtzJobDetails;
import uk.gov.beis.dceas.db.gen.tables.QrtzLocks;
import uk.gov.beis.dceas.db.gen.tables.QrtzPausedTriggerGrps;
import uk.gov.beis.dceas.db.gen.tables.QrtzSchedulerState;
import uk.gov.beis.dceas.db.gen.tables.QrtzSimpleTriggers;
import uk.gov.beis.dceas.db.gen.tables.QrtzSimpropTriggers;
import uk.gov.beis.dceas.db.gen.tables.QrtzTriggers;
import uk.gov.beis.dceas.db.gen.tables.UserState;
import uk.gov.beis.dceas.db.gen.tables.WpOptions;
import uk.gov.beis.dceas.db.gen.tables.WpPostmeta;
import uk.gov.beis.dceas.db.gen.tables.WpPosts;
import uk.gov.beis.dceas.db.gen.tables.records.BoilersRecord;
import uk.gov.beis.dceas.db.gen.tables.records.DatabasechangeloglockRecord;
import uk.gov.beis.dceas.db.gen.tables.records.FeedbackRecord;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzCalendarsRecord;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzCronTriggersRecord;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzFiredTriggersRecord;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzJobDetailsRecord;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzLocksRecord;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzPausedTriggerGrpsRecord;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzSchedulerStateRecord;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzSimpleTriggersRecord;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzSimpropTriggersRecord;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzTriggersRecord;
import uk.gov.beis.dceas.db.gen.tables.records.UserStateRecord;
import uk.gov.beis.dceas.db.gen.tables.records.WpOptionsRecord;
import uk.gov.beis.dceas.db.gen.tables.records.WpPostmetaRecord;
import uk.gov.beis.dceas.db.gen.tables.records.WpPostsRecord;


/**
 * A class modelling foreign key relationships between tables of the <code></code> 
 * schema
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.9.6"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Keys {

    // -------------------------------------------------------------------------
    // IDENTITY definitions
    // -------------------------------------------------------------------------

    public static final Identity<FeedbackRecord, Integer> IDENTITY_FEEDBACK = Identities0.IDENTITY_FEEDBACK;

    // -------------------------------------------------------------------------
    // UNIQUE and PRIMARY KEY definitions
    // -------------------------------------------------------------------------

    public static final UniqueKey<BoilersRecord> PK_BOILERS = UniqueKeys0.PK_BOILERS;
    public static final UniqueKey<DatabasechangeloglockRecord> PK_DATABASECHANGELOGLOCK = UniqueKeys0.PK_DATABASECHANGELOGLOCK;
    public static final UniqueKey<FeedbackRecord> PK_FEEDBACK = UniqueKeys0.PK_FEEDBACK;
    public static final UniqueKey<QrtzCalendarsRecord> PK_QRTZ_CALENDARS = UniqueKeys0.PK_QRTZ_CALENDARS;
    public static final UniqueKey<QrtzCronTriggersRecord> PK_QRTZ_CRON_TRIGGERS = UniqueKeys0.PK_QRTZ_CRON_TRIGGERS;
    public static final UniqueKey<QrtzFiredTriggersRecord> PK_QRTZ_FIRED_TRIGGERS = UniqueKeys0.PK_QRTZ_FIRED_TRIGGERS;
    public static final UniqueKey<QrtzJobDetailsRecord> PK_QRTZ_JOB_DETAILS = UniqueKeys0.PK_QRTZ_JOB_DETAILS;
    public static final UniqueKey<QrtzLocksRecord> PK_QRTZ_LOCKS = UniqueKeys0.PK_QRTZ_LOCKS;
    public static final UniqueKey<QrtzPausedTriggerGrpsRecord> PK_QRTZ_PAUSED_TRIGGER_GRPS = UniqueKeys0.PK_QRTZ_PAUSED_TRIGGER_GRPS;
    public static final UniqueKey<QrtzSchedulerStateRecord> PK_QRTZ_SCHEDULER_STATE = UniqueKeys0.PK_QRTZ_SCHEDULER_STATE;
    public static final UniqueKey<QrtzSimpleTriggersRecord> PK_QRTZ_SIMPLE_TRIGGERS = UniqueKeys0.PK_QRTZ_SIMPLE_TRIGGERS;
    public static final UniqueKey<QrtzSimpropTriggersRecord> PK_QRTZ_SIMPROP_TRIGGERS = UniqueKeys0.PK_QRTZ_SIMPROP_TRIGGERS;
    public static final UniqueKey<QrtzTriggersRecord> PK_QRTZ_TRIGGERS = UniqueKeys0.PK_QRTZ_TRIGGERS;
    public static final UniqueKey<UserStateRecord> PK_USER_STATE = UniqueKeys0.PK_USER_STATE;
    public static final UniqueKey<WpOptionsRecord> PK_WP_OPTIONS = UniqueKeys0.PK_WP_OPTIONS;
    public static final UniqueKey<WpOptionsRecord> OPTION_NAME = UniqueKeys0.OPTION_NAME;
    public static final UniqueKey<WpPostmetaRecord> PK_WP_POSTMETA = UniqueKeys0.PK_WP_POSTMETA;
    public static final UniqueKey<WpPostsRecord> PK_WP_POSTS = UniqueKeys0.PK_WP_POSTS;

    // -------------------------------------------------------------------------
    // FOREIGN KEY definitions
    // -------------------------------------------------------------------------

    public static final ForeignKey<QrtzCronTriggersRecord, QrtzTriggersRecord> FK_QRTZ_CRON_TRIGGERS_QRTZ_TRIGGERS = ForeignKeys0.FK_QRTZ_CRON_TRIGGERS_QRTZ_TRIGGERS;
    public static final ForeignKey<QrtzSimpleTriggersRecord, QrtzTriggersRecord> FK_QRTZ_SIMPLE_TRIGGERS_QRTZ_TRIGGERS = ForeignKeys0.FK_QRTZ_SIMPLE_TRIGGERS_QRTZ_TRIGGERS;
    public static final ForeignKey<QrtzSimpropTriggersRecord, QrtzTriggersRecord> FK_QRTZ_SIMPROP_TRIGGERS_QRTZ_TRIGGERS = ForeignKeys0.FK_QRTZ_SIMPROP_TRIGGERS_QRTZ_TRIGGERS;
    public static final ForeignKey<QrtzTriggersRecord, QrtzJobDetailsRecord> FK_QRTZ_TRIGGERS_QRTZ_JOB_DETAILS = ForeignKeys0.FK_QRTZ_TRIGGERS_QRTZ_JOB_DETAILS;
    public static final ForeignKey<WpPostmetaRecord, WpPostsRecord> FK_WP_POSTMETA__WP_POSTS = ForeignKeys0.FK_WP_POSTMETA__WP_POSTS;

    // -------------------------------------------------------------------------
    // [#1459] distribute members to avoid static initialisers > 64kb
    // -------------------------------------------------------------------------

    private static class Identities0 extends AbstractKeys {
        public static Identity<FeedbackRecord, Integer> IDENTITY_FEEDBACK = createIdentity(Feedback.FEEDBACK, Feedback.FEEDBACK.ID);
    }

    private static class UniqueKeys0 extends AbstractKeys {
        public static final UniqueKey<BoilersRecord> PK_BOILERS = createUniqueKey(Boilers.BOILERS, "pk_boilers", Boilers.BOILERS.PRODUCT_INDEX_NUMBER);
        public static final UniqueKey<DatabasechangeloglockRecord> PK_DATABASECHANGELOGLOCK = createUniqueKey(Databasechangeloglock.DATABASECHANGELOGLOCK, "pk_databasechangeloglock", Databasechangeloglock.DATABASECHANGELOGLOCK.ID);
        public static final UniqueKey<FeedbackRecord> PK_FEEDBACK = createUniqueKey(Feedback.FEEDBACK, "pk_feedback", Feedback.FEEDBACK.ID);
        public static final UniqueKey<QrtzCalendarsRecord> PK_QRTZ_CALENDARS = createUniqueKey(QrtzCalendars.QRTZ_CALENDARS, "pk_qrtz_calendars", QrtzCalendars.QRTZ_CALENDARS.SCHED_NAME, QrtzCalendars.QRTZ_CALENDARS.CALENDAR_NAME);
        public static final UniqueKey<QrtzCronTriggersRecord> PK_QRTZ_CRON_TRIGGERS = createUniqueKey(QrtzCronTriggers.QRTZ_CRON_TRIGGERS, "pk_qrtz_cron_triggers", QrtzCronTriggers.QRTZ_CRON_TRIGGERS.SCHED_NAME, QrtzCronTriggers.QRTZ_CRON_TRIGGERS.TRIGGER_NAME, QrtzCronTriggers.QRTZ_CRON_TRIGGERS.TRIGGER_GROUP);
        public static final UniqueKey<QrtzFiredTriggersRecord> PK_QRTZ_FIRED_TRIGGERS = createUniqueKey(QrtzFiredTriggers.QRTZ_FIRED_TRIGGERS, "pk_qrtz_fired_triggers", QrtzFiredTriggers.QRTZ_FIRED_TRIGGERS.SCHED_NAME, QrtzFiredTriggers.QRTZ_FIRED_TRIGGERS.ENTRY_ID);
        public static final UniqueKey<QrtzJobDetailsRecord> PK_QRTZ_JOB_DETAILS = createUniqueKey(QrtzJobDetails.QRTZ_JOB_DETAILS, "pk_qrtz_job_details", QrtzJobDetails.QRTZ_JOB_DETAILS.SCHED_NAME, QrtzJobDetails.QRTZ_JOB_DETAILS.JOB_NAME, QrtzJobDetails.QRTZ_JOB_DETAILS.JOB_GROUP);
        public static final UniqueKey<QrtzLocksRecord> PK_QRTZ_LOCKS = createUniqueKey(QrtzLocks.QRTZ_LOCKS, "pk_qrtz_locks", QrtzLocks.QRTZ_LOCKS.SCHED_NAME, QrtzLocks.QRTZ_LOCKS.LOCK_NAME);
        public static final UniqueKey<QrtzPausedTriggerGrpsRecord> PK_QRTZ_PAUSED_TRIGGER_GRPS = createUniqueKey(QrtzPausedTriggerGrps.QRTZ_PAUSED_TRIGGER_GRPS, "pk_qrtz_paused_trigger_grps", QrtzPausedTriggerGrps.QRTZ_PAUSED_TRIGGER_GRPS.SCHED_NAME, QrtzPausedTriggerGrps.QRTZ_PAUSED_TRIGGER_GRPS.TRIGGER_GROUP);
        public static final UniqueKey<QrtzSchedulerStateRecord> PK_QRTZ_SCHEDULER_STATE = createUniqueKey(QrtzSchedulerState.QRTZ_SCHEDULER_STATE, "pk_qrtz_scheduler_state", QrtzSchedulerState.QRTZ_SCHEDULER_STATE.SCHED_NAME, QrtzSchedulerState.QRTZ_SCHEDULER_STATE.INSTANCE_NAME);
        public static final UniqueKey<QrtzSimpleTriggersRecord> PK_QRTZ_SIMPLE_TRIGGERS = createUniqueKey(QrtzSimpleTriggers.QRTZ_SIMPLE_TRIGGERS, "pk_qrtz_simple_triggers", QrtzSimpleTriggers.QRTZ_SIMPLE_TRIGGERS.SCHED_NAME, QrtzSimpleTriggers.QRTZ_SIMPLE_TRIGGERS.TRIGGER_NAME, QrtzSimpleTriggers.QRTZ_SIMPLE_TRIGGERS.TRIGGER_GROUP);
        public static final UniqueKey<QrtzSimpropTriggersRecord> PK_QRTZ_SIMPROP_TRIGGERS = createUniqueKey(QrtzSimpropTriggers.QRTZ_SIMPROP_TRIGGERS, "pk_qrtz_simprop_triggers", QrtzSimpropTriggers.QRTZ_SIMPROP_TRIGGERS.SCHED_NAME, QrtzSimpropTriggers.QRTZ_SIMPROP_TRIGGERS.TRIGGER_NAME, QrtzSimpropTriggers.QRTZ_SIMPROP_TRIGGERS.TRIGGER_GROUP);
        public static final UniqueKey<QrtzTriggersRecord> PK_QRTZ_TRIGGERS = createUniqueKey(QrtzTriggers.QRTZ_TRIGGERS, "pk_qrtz_triggers", QrtzTriggers.QRTZ_TRIGGERS.SCHED_NAME, QrtzTriggers.QRTZ_TRIGGERS.TRIGGER_NAME, QrtzTriggers.QRTZ_TRIGGERS.TRIGGER_GROUP);
        public static final UniqueKey<UserStateRecord> PK_USER_STATE = createUniqueKey(UserState.USER_STATE, "pk_user_state", UserState.USER_STATE.ID);
        public static final UniqueKey<WpOptionsRecord> PK_WP_OPTIONS = createUniqueKey(WpOptions.WP_OPTIONS, "pk_wp_options", WpOptions.WP_OPTIONS.OPTION_ID);
        public static final UniqueKey<WpOptionsRecord> OPTION_NAME = createUniqueKey(WpOptions.WP_OPTIONS, "option_name", WpOptions.WP_OPTIONS.OPTION_NAME);
        public static final UniqueKey<WpPostmetaRecord> PK_WP_POSTMETA = createUniqueKey(WpPostmeta.WP_POSTMETA, "pk_wp_postmeta", WpPostmeta.WP_POSTMETA.META_ID);
        public static final UniqueKey<WpPostsRecord> PK_WP_POSTS = createUniqueKey(WpPosts.WP_POSTS, "pk_wp_posts", WpPosts.WP_POSTS.ID);
    }

    private static class ForeignKeys0 extends AbstractKeys {
        public static final ForeignKey<QrtzCronTriggersRecord, QrtzTriggersRecord> FK_QRTZ_CRON_TRIGGERS_QRTZ_TRIGGERS = createForeignKey(uk.gov.beis.dceas.db.gen.Keys.PK_QRTZ_TRIGGERS, QrtzCronTriggers.QRTZ_CRON_TRIGGERS, "fk_qrtz_cron_triggers_qrtz_triggers", QrtzCronTriggers.QRTZ_CRON_TRIGGERS.SCHED_NAME, QrtzCronTriggers.QRTZ_CRON_TRIGGERS.TRIGGER_NAME, QrtzCronTriggers.QRTZ_CRON_TRIGGERS.TRIGGER_GROUP);
        public static final ForeignKey<QrtzSimpleTriggersRecord, QrtzTriggersRecord> FK_QRTZ_SIMPLE_TRIGGERS_QRTZ_TRIGGERS = createForeignKey(uk.gov.beis.dceas.db.gen.Keys.PK_QRTZ_TRIGGERS, QrtzSimpleTriggers.QRTZ_SIMPLE_TRIGGERS, "fk_qrtz_simple_triggers_qrtz_triggers", QrtzSimpleTriggers.QRTZ_SIMPLE_TRIGGERS.SCHED_NAME, QrtzSimpleTriggers.QRTZ_SIMPLE_TRIGGERS.TRIGGER_NAME, QrtzSimpleTriggers.QRTZ_SIMPLE_TRIGGERS.TRIGGER_GROUP);
        public static final ForeignKey<QrtzSimpropTriggersRecord, QrtzTriggersRecord> FK_QRTZ_SIMPROP_TRIGGERS_QRTZ_TRIGGERS = createForeignKey(uk.gov.beis.dceas.db.gen.Keys.PK_QRTZ_TRIGGERS, QrtzSimpropTriggers.QRTZ_SIMPROP_TRIGGERS, "fk_qrtz_simprop_triggers_qrtz_triggers", QrtzSimpropTriggers.QRTZ_SIMPROP_TRIGGERS.SCHED_NAME, QrtzSimpropTriggers.QRTZ_SIMPROP_TRIGGERS.TRIGGER_NAME, QrtzSimpropTriggers.QRTZ_SIMPROP_TRIGGERS.TRIGGER_GROUP);
        public static final ForeignKey<QrtzTriggersRecord, QrtzJobDetailsRecord> FK_QRTZ_TRIGGERS_QRTZ_JOB_DETAILS = createForeignKey(uk.gov.beis.dceas.db.gen.Keys.PK_QRTZ_JOB_DETAILS, QrtzTriggers.QRTZ_TRIGGERS, "fk_qrtz_triggers_qrtz_job_details", QrtzTriggers.QRTZ_TRIGGERS.SCHED_NAME, QrtzTriggers.QRTZ_TRIGGERS.JOB_NAME, QrtzTriggers.QRTZ_TRIGGERS.JOB_GROUP);
        public static final ForeignKey<WpPostmetaRecord, WpPostsRecord> FK_WP_POSTMETA__WP_POSTS = createForeignKey(uk.gov.beis.dceas.db.gen.Keys.PK_WP_POSTS, WpPostmeta.WP_POSTMETA, "fk_wp_postmeta__wp_posts", WpPostmeta.WP_POSTMETA.POST_ID);
    }
}
