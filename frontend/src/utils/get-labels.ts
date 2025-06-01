import { ProjectStatus } from '@/generated/protos/v1/data_project';
import { UserDevContainerStatus } from '@/generated/protos/v1/dev_container';
import { t } from 'i18next';

interface StatusInfo {
  label: string;
  bgColor: string;
  textColor: string;
}

export function getProjectStatusInfo(status: ProjectStatus): StatusInfo {
  switch (status) {
    case ProjectStatus.PROJECT_STATUS_UNSPECIFIED:
      return {
        label: t('project.status.unspecified'),
        bgColor: 'bg-gray-100 dark:bg-gray-700',
        textColor: 'text-gray-600 dark:text-gray-300',
      };
    case ProjectStatus.PROJECT_STATUS_PLANNING:
      return {
        label: t('project.status.planning'),
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-800 dark:text-blue-300',
      };
    case ProjectStatus.PROJECT_STATUS_ALPHA:
      return {
        label: t('project.status.alpha'),
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        textColor: 'text-purple-800 dark:text-purple-300',
      };
    case ProjectStatus.PROJECT_STATUS_BETA:
      return {
        label: t('project.status.beta'),
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        textColor: 'text-yellow-800 dark:text-yellow-300',
      };
    case ProjectStatus.PROJECT_STATUS_EARLY_ACCESS:
      return {
        label: t('project.status.earlyAccess'),
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        textColor: 'text-orange-800 dark:text-orange-300',
      };
    case ProjectStatus.PROJECT_STATUS_LAUNCHED:
      return {
        label: t('project.status.launched'),
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
      };
    case ProjectStatus.PROJECT_STATUS_CANCELLED:
      return {
        label: t('project.status.cancelled'),
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
      };
    case ProjectStatus.UNRECOGNIZED:
    default:
      return {
        label: t('project.status.unspecified'),
        bgColor: 'bg-gray-100 dark:bg-gray-700',
        textColor: 'text-gray-600 dark:text-gray-300',
      };
  }
}

export function getContainerStatusInfo(
  status: UserDevContainerStatus
): StatusInfo {
  switch (status) {
    case UserDevContainerStatus.USER_DEV_CONTAINER_STATUS_UNSPECIFIED:
      return {
        label: t('container.status.unspecified'),
        bgColor: 'bg-gray-100 dark:bg-gray-700',
        textColor: 'text-gray-600 dark:text-gray-300',
      };
    case UserDevContainerStatus.USER_DEV_CONTAINER_STATUS_PROVISIONING:
      return {
        label: t('container.status.provisioning'),
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-800 dark:text-blue-300',
      };
    case UserDevContainerStatus.USER_DEV_CONTAINER_STATUS_RUNNING:
      return {
        label: t('container.status.running'),
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
      };
    case UserDevContainerStatus.USER_DEV_CONTAINER_STATUS_RESUMING:
      return {
        label: t('container.status.resuming'),
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        textColor: 'text-yellow-800 dark:text-yellow-300',
      };
    case UserDevContainerStatus.USER_DEV_CONTAINER_STATUS_STOPPED:
      return {
        label: t('container.status.stopped'),
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
      };
    case UserDevContainerStatus.USER_DEV_CONTAINER_STATUS_ERROR:
      return {
        label: t('container.status.error'),
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
      };
    case UserDevContainerStatus.USER_DEV_CONTAINER_STATUS_STOPPING:
      return {
        label: t('container.status.stopping'),
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        textColor: 'text-yellow-800 dark:text-yellow-300',
      };
    case UserDevContainerStatus.UNRECOGNIZED:
    default:
      return {
        label: t('container.status.unspecified'),
        bgColor: 'bg-gray-100 dark:bg-gray-700',
        textColor: 'text-gray-600 dark:text-gray-300',
      };
  }
}
