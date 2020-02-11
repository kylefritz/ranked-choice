class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  before_action :set_paper_trail_whodunnit # calls user_for_paper_trail
  before_action :set_raven_context

  protected

  def set_raven_context
    Raven.user_context(id: current_user&.id, email: current_user&.email, is_admin: current_user&.is_admin)
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end

  def user_for_paper_trail
    current_user&.id
  end

  def redirect_unless_user_is_admin!
    # used by active admin to keep out non-admins
    unless current_user&.is_admin?
      logger.info "its NOT ok. user isn't admin"
      return redirect_to '/users/sign_in', alert: 'you must be an admin'
    end

    logger.info "its ok the user is an admin"
  end

  def current_admin_user
    if current_user&.is_admin?
      current_user
    end
  end
end
