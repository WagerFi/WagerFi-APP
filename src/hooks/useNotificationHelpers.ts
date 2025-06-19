import { useCallback } from 'react';
import { useWalletContext } from '../contexts/WalletContext';
import { NotificationHelpers } from '../lib/notifications';
import { useNotifications } from '../contexts/NotificationContext';

export const useNotificationHelpers = () => {
    const { walletAddress } = useWalletContext();
    const { addNotification } = useNotifications();

    // Helper to create local notifications (for immediate feedback like clipboard copy)
    const createLocalNotification = useCallback((
        type: string,
        title: string,
        message: string,
        expiresInMs: number = 3000
    ) => {
        if (!walletAddress) return;

        const notification = {
            id: `local-${Date.now()}-${Math.random()}`,
            user_address: walletAddress,
            type: type as any,
            title,
            message,
            data: {},
            read: false,
            created_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + expiresInMs).toISOString()
        };

        addNotification(notification);
    }, [walletAddress, addNotification]);

    // Wager notifications
    const notifyWagerCreated = useCallback(async (wagerAmount: number, wagerType: string) => {
        if (!walletAddress) return;
        await NotificationHelpers.wagerCreated(walletAddress, wagerAmount, wagerType);
    }, [walletAddress]);

    const notifyWagerAccepted = useCallback(async (opponentAddress: string, wagerAmount: number) => {
        if (!walletAddress) return;
        await NotificationHelpers.wagerAccepted(walletAddress, opponentAddress, wagerAmount);
    }, [walletAddress]);

    const notifyWagerWon = useCallback(async (wagerAmount: number, winnings: number) => {
        if (!walletAddress) return;
        await NotificationHelpers.wagerWon(walletAddress, wagerAmount, winnings);
    }, [walletAddress]);

    const notifyWagerLost = useCallback(async (wagerAmount: number) => {
        if (!walletAddress) return;
        await NotificationHelpers.wagerLost(walletAddress, wagerAmount);
    }, [walletAddress]);

    const notifyWagerExpired = useCallback(async (wagerAmount: number) => {
        if (!walletAddress) return;
        await NotificationHelpers.wagerExpired(walletAddress, wagerAmount);
    }, [walletAddress]);

    // Profile notifications
    const notifyProfileUpdated = useCallback(async () => {
        if (!walletAddress) return;
        await NotificationHelpers.profileUpdated(walletAddress);
    }, [walletAddress]);

    const notifyUsernameUpdated = useCallback(async (newUsername: string) => {
        if (!walletAddress) return;
        await NotificationHelpers.usernameUpdated(walletAddress, newUsername);
    }, [walletAddress]);

    // System notifications (local only)
    const notifyAddressCopied = useCallback(() => {
        createLocalNotification(
            'address_copied',
            'Address Copied',
            'Wallet address copied to clipboard!',
            3000
        );
    }, [createLocalNotification]);

    const notifyTransactionSuccess = useCallback((type: string) => {
        createLocalNotification(
            'transaction_success',
            'Transaction Successful',
            `Your ${type} transaction has been confirmed on the blockchain.`,
            5000
        );
    }, [createLocalNotification]);

    const notifyTransactionFailed = useCallback((type: string, error?: string) => {
        createLocalNotification(
            'transaction_failed',
            'Transaction Failed',
            error || `Your ${type} transaction failed. Please try again.`,
            8000
        );
    }, [createLocalNotification]);

    // Generic success/error notifications
    const notifySuccess = useCallback((title: string, message: string, expiresInMs: number = 5000) => {
        createLocalNotification('transaction_success', title, message, expiresInMs);
    }, [createLocalNotification]);

    const notifyError = useCallback((title: string, message: string, expiresInMs: number = 8000) => {
        createLocalNotification('transaction_failed', title, message, expiresInMs);
    }, [createLocalNotification]);

    const notifyInfo = useCallback((title: string, message: string, expiresInMs: number = 5000) => {
        createLocalNotification('system_announcement', title, message, expiresInMs);
    }, [createLocalNotification]);

    return {
        // Wager notifications
        notifyWagerCreated,
        notifyWagerAccepted,
        notifyWagerWon,
        notifyWagerLost,
        notifyWagerExpired,

        // Profile notifications
        notifyProfileUpdated,
        notifyUsernameUpdated,

        // System notifications
        notifyAddressCopied,
        notifyTransactionSuccess,
        notifyTransactionFailed,

        // Generic notifications
        notifySuccess,
        notifyError,
        notifyInfo,

        // Direct local notification creation
        createLocalNotification
    };
}; 