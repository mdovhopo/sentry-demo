import { I18nKeys } from "i18n/keys";
import { defineMessages } from "react-intl";

export default defineMessages({
  search: {
    id: I18nKeys.Search,
    defaultMessage: 'Search',
  },
  loading: {
    id: I18nKeys.Loading,
    defaultMessage: 'Loading...',
  },
  cancel: {
    id: I18nKeys.Cancel,
    defaultMessage: 'Cancel',
  },
  title: {
    id: I18nKeys.Title,
    defaultMessage: 'Title',
  },
  description: {
    id: I18nKeys.Description,
    defaultMessage: 'Description',
  },
  edit: {
    id: I18nKeys.TodoEdit,
    defaultMessage: 'Edit',
  },
  remove: {
    id: I18nKeys.TodoRemove,
    defaultMessage: 'Remove',
  },
  addItem: {
    id: I18nKeys.TodoAddItem,
    defaultMessage: 'Add Item',
  },
  editItem: {
    id: I18nKeys.TodoEditItem,
    defaultMessage: 'Edit Item',
  },
});
