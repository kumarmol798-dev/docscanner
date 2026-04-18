import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "mo:caffeineai-object-storage/Storage";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Common "types/common";
import DocTypes "types/documents";
import ProfileTypes "types/profile";
import DocumentsApi "mixins/documents-api";
import ProfileApi "mixins/profile-api";

actor {
  // Object storage infrastructure (handles file upload/download proxying)
  include MixinObjectStorage();

  // Authorization state (Internet Identity login + role management)
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profiles
  let userProfiles = Map.empty<Principal, ProfileTypes.UserProfile>();
  include ProfileApi(accessControlState, userProfiles);

  // Document library state
  let docs = Map.empty<Common.DocumentId, DocTypes.DocumentInternal>();
  include DocumentsApi(accessControlState, docs);
};
