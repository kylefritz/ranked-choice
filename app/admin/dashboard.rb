ActiveAdmin.register_page "Dashboard" do
  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do
 

    section "Recently updated content" do
      table_for PaperTrail::Version.order('id desc').limit(20) do # Use PaperTrail::Version if this throws an error
        column ("Item") { |v| v.item }
        # column ("Item") { |v| link_to v.item, [:admin, v.item] } # Uncomment to display as link
        column ("Type") { |v| v.item_type.underscore.humanize }
        column ("Modified at") { |v| v.created_at.to_s :long }
        column ("User") do |v|
          User.find_by(id: v.whodunnit)&.email || "whodunnit: '#{v.whodunnit}'"
        end
      end
    end

  end # content
end
