defmodule ElixirUI.HeadlessComponents do
  @doc """
  Liveview analogs of https://headlessui.com/react/menu components.
  """
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def dropdown_menu(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def disclosure(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end



  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def dialog(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end



  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def popover(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end



  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def tabs(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end



  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def transition(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end






  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def button(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end

  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def checkbox(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end

  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def combobox(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def fieldset(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def input(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def listbox(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def radio_group(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def select(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def switch(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end


  attr :as, :any, default: :button
  attr :class, :string, default: nil
  attr :rest, :global
  slot :inner_block, required: true
  def textarea(assigns) do
    ~H"""
    <.dynamic_tag name={@as} class={["button", @class]} {@rest}><%= render_slot(@inner_block) %></.dynamic_tag>
    """
  end





end
