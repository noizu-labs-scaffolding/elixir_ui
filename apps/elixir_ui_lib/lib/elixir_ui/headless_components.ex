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
        {@rest}
    ><%= render_slot(@inner_block) %></.dynamic_tag_fork>
    </eui-button>
    """
  end

  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def checkbox(assigns) do
    ~H"""
    <eui-checkbox>
    <.dynamic_tag
      name={@as}
      class={[@class]} {@rest}
    ><%= render_slot(@inner_block) %>
    </.dynamic_tag>
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
