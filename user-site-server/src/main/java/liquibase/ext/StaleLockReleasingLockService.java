package liquibase.ext;

import liquibase.exception.DatabaseException;
import liquibase.exception.LockException;
import liquibase.lockservice.DatabaseChangeLogLock;
import liquibase.lockservice.StandardLockService;

import java.util.Arrays;
import java.util.Date;

public class StaleLockReleasingLockService extends StandardLockService {

    // Locks go stale after 10 minutes.
    private static final long MAX_LOCK_AGE_MS = 10 * 60 * 1000;

    @Override
    public int getPriority() {
        return super.getPriority() + 1;
    }

    @Override
    public boolean acquireLock() throws LockException {
        releaseStaleLocks();
        return super.acquireLock();
    }

    private void releaseStaleLocks() throws LockException {
        DatabaseChangeLogLock[] locks = listLocks();
        if (locks.length == 0) {
            return;
        }
        if (!Arrays.stream(locks).allMatch(this::isStale)) {
            return;
        }
        try {
            super.forceReleaseLock();
        } catch (DatabaseException e) {
            throw new LockException("Could not force release of database changelog lock.", e);
        }
    }

    private boolean isStale(DatabaseChangeLogLock lock) {
        Date now = new Date();
        long lockAgeMs = now.getTime() - lock.getLockGranted().getTime();
        return lockAgeMs > MAX_LOCK_AGE_MS;
    }
}
