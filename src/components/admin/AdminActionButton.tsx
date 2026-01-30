import { Plus, Pencil, Trash2 } from 'lucide-react';
import classNames from 'classnames';
import { AdminActionButtonProps } from '@/types/componentTypes';
import { AdminAction } from '@/types/helperTypes';

const ACTION_CONFIG = {
    create: {
        label: 'Create',
        icon: Plus,
        styles: 'bg-green-600 hover:bg-green-700 text-white border-green-600',
    },
    edit: {
        label: 'Edit',
        icon: Pencil,
        styles: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500',
    },
    delete: {
        label: 'Delete',
        icon: Trash2,
        styles: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
    },
} as const;

const AdminActionButton = ({
    action,
    onClick,
    disabled = false,
    className,
}: AdminActionButtonProps) => {
    const config = ACTION_CONFIG[action as AdminAction];
    const Icon = config.icon;

    return (
        <button
            type='button'
            onClick={onClick}
            disabled={disabled}
            className={classNames(
                'inline-flex items-center gap-2 px-3 py-1 rounded-md font-medium',
                'transition-colors duration-200',
                'border focus:outline-none focus:ring-2 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                config.styles,
                {
                    'focus:ring-green-500': action === 'create',
                    'focus:ring-yellow-500': action === 'edit',
                    'focus:ring-red-500': action === 'delete',
                },
                className
            )}
        >
            <Icon size={18} />
            <span>{config.label}</span>
        </button>
    );
};

export default AdminActionButton;
