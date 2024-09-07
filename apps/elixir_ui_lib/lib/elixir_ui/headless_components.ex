defmodule ElixirUI.HeadlessComponents do
  @doc """
  Liveview analogs of https://headlessui.com/react/menu components.
  """
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  attr :as, :string, required: true, doc: "The name of the tag, such as `div`."
  attr :rest, :global, doc: "Additional HTML attributes to add to the tag, ensuring proper escaping."
  slot :inner_block
  def dynamic_tag_fork(%{as: name, rest: rest} = assigns) do
    tag_name = to_string(name)

    tag =
      case Phoenix.HTML.html_escape(tag_name) do
        {:safe, ^tag_name} ->
          tag_name

        {:safe, _escaped} ->
          raise ArgumentError,
                "expected dynamic_tag name to be safe HTML, got: #{inspect(tag_name)}"
      end

    assigns =
      assigns
      |> assign(:tag, tag)
      |> assign(:escaped_attrs, Phoenix.LiveView.HTMLEngine.attributes_escape(rest))

    if assigns.inner_block != [] do
      ~H"""
      <%= {:safe, [?<, @tag]} %><%= @escaped_attrs %><%= {:safe, [?>]} %><%= render_slot(@inner_block) %><%= {:safe, [?<, ?/, @tag, ?>]} %>
      """
    else
      ~H"""
      <%= {:safe, [?<, @tag]} %><%= @escaped_attrs %><%= {:safe, [?/, ?>]} %>
      """
    end
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def dropdown_menu(assigns) do
    ~H"""
    <eui-dropdown-menu>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-dropdown-menu>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def disclosure(assigns) do
    ~H"""
    <eui-disclosure>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-disclosure>
    """
  end



  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def dialog(assigns) do
    ~H"""
    <eui-dialog>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-dialog>
    """
  end



  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def popover(assigns) do
    ~H"""
    <eui-popover>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-popover>
    """
  end



  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def tabs(assigns) do
    ~H"""
    <eui-tabs>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-tabs>
    """
  end



  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def transition(assigns) do
    ~H"""
    <eui-transition>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-transition>
    """
  end






  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :disabled, :boolean, default: false
  attr :type, :string, default: "button"
  attr :rest, :global
  slot :inner_block, required: true
  def button(assigns) do
    ~H"""
    <eui-button>
    <.dynamic_tag_fork
        as={@as}
        class={@class}
        type={@type}
        role="button"
        {@disabled && %{disabled: []} || %{tabindex: 0} }
        {@rest}
    ><%= render_slot(@inner_block) %></.dynamic_tag_fork>
    </eui-button>
    """
  end


  @doc """
  # Based on

  - [HeadlessUI demo](https://headlessui.com/react/checkbox)

  - [HeadlessUI implementation](https://github.com/tailwindlabs/headlessui/blob/main/packages/@headlessui-react/src/components/checkbox/checkbox.tsx)

    ## Example
    <span
        class="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
        id="headlessui-checkbox-:R16:"
        role="checkbox"
        aria-checked="true"
        tabindex="0"
        data-headlessui-state="checked"
        data-checked="">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="hidden size-4 fill-black group-data-[checked]:block"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg>
    </span>

    """
  attr :id, :any, default: nil
  attr :name, :any
  attr :value, :any
  attr :field, Phoenix.HTML.FormField,
       doc: "a form field struct retrieved from the form, for example: @form[:email]"
  attr :checked, :boolean, doc: "the checked flag for checkbox inputs"

  attr :as, :any, default: :span
  attr :class, :string, default: nil
  attr :disabled, :boolean, default: false
  attr :rest, :global
  slot :inner_block, required: true
  def checkbox(assigns)
  def checkbox(%{field: %Phoenix.HTML.FormField{} = field} = assigns) do
    errors = if Phoenix.Component.used_input?(field), do: field.errors, else: []
    assigns
    |> assign(field: nil, id: assigns.id || field.id)
    #|> assign(:errors, Enum.map(errors, &translate_error(&1)))
    |> assign_new(:name, fn -> if assigns.multiple, do: field.name <> "[]", else: field.name end)
    |> assign_new(:value, fn -> field.value end)
    |> checkbox()
  end
  def checkbox(assigns) do
    assigns = assigns
      |> assign_new(:checked, fn ->
        Phoenix.HTML.Form.normalize_value("checkbox", assigns[:value])
      end)
      |> assign_new(:id, fn ->
        "cb-#{rem(:os.system_time(:nanosecond),1_000_000)}#{:rand.uniform(5000000)}"
      end)
              |> assign_new(:name, fn ->
      "cb-#{rem(:os.system_time(:nanosecond),1_000_000)}#{:rand.uniform(5000000)}"
    end)

    ~H"""
    <eui-checkbox>
    <.dynamic_tag_fork
      as={@as}
      role="checkbox"
      aria-checked={@checked}
      class={[@class]}
      {@checked && %{"data-checked": []} || %{}}
      {@disabled && %{disabled: []} || %{tabindex: 0} }
      {@rest |> Map.drop([:checked, :disabled, :"phx-change"])}
    >
    <input
      id={@id}
      type="hidden"
      name={@name}
      value={@checked && "true" || "false"}
      {@disabled && %{disabled: []} || %{} }
      {Map.take(@rest, [:"phx-change",:"phx-click",:"phx-focus",:"phx-blur",:"phx-keydown",:"phx-keyup",:"phx-keypress"])}


    />
    <%= render_slot(@inner_block) %>
    </.dynamic_tag_fork>
    </eui-checkbox>
    """
  end

  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def combobox(assigns) do
    ~H"""
    <eui-combobox>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-combobox>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def fieldset(assigns) do
    ~H"""
    <eui-fieldset>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-fieldset>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def input(assigns) do
    ~H"""
    <eui-input>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-input>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def listbox(assigns) do
    ~H"""
    <eui-listbox>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-listbox>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def radio_group(assigns) do
    ~H"""
    <eui-radio-group>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-radio-group>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def select(assigns) do
    ~H"""
    <eui-select>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-select>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def switch(assigns) do
    ~H"""
    <eui-switch>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-switch>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def textarea(assigns) do
    ~H"""
    <eui-textarea>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
    </eui-textarea>
    """
  end





end
